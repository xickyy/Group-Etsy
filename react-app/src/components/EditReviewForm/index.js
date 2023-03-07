import "./EditReviewForm.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";

const EditReviewForm = ({ review, productId }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const reviewId = review.id;

    const [body, setBody] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    useEffect(() => {
        if (review) {
          setBody(review.body);
          setStars(review.stars);
        }
      }, [review.review]);

    const updateBody = (e) => setBody(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
          productId,
          reviewId,
          body,
          stars
        };

        let editedReview = await dispatch(editReviewThunk(payload)).catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors)
              else closeModal()
            }
        );
      
        if (editedReview) {
            window.location.reload()
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
          <p>Edit Your Review:</p>
          <input
            type="text"
            placeholder={"Review here"}
            value={body}
            onChange={updateBody}
          />

          <p>How would you rate this product?</p>
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
              Edit Your Review
            </button>
          </div>
        </div>
     </form>
    ) : null;
};

export default EditReviewForm;