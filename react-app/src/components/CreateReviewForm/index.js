import "./CreateReviewForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeReviewThunk } from "../../store/reviews";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

const CreateReviewForm = (productId) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { productId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);

    const [body, setBody] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const updateBody = (e) => setBody(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
          body,
          stars,
        };

        let createdReview = await dispatch(makeReviewThunk(productId.productId, payload)).catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors)
              else closeModal()
            }
        );
      
        if (createdReview) {
            history.push(`/products/${productId.productId}`)
            closeModal()
        }
    };

    return sessionUser.id ? (
     <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, index) => (
            <li key={index}>Error: {error}</li>
          ))}
        </div>
        <div>
          <p>Write a Review:</p>
          <input
            type="text"
            placeholder="Review here"
            value={body}
            onChange={updateBody}
          />

          <p>How would you rate your experience?</p>
          <input
            type="number"
            placeholder="Stars here"
            value={stars}
            onChange={updateStars}
            min="1"
            max="5"
          />
          <div>
            <button type="submit">
              Create New Review
            </button>
          </div>
        </div>
     </form>
    ) : null;
};

export default CreateReviewForm;