import "./CreateReviewForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";

const CreateReviewForm = (productId) => {
  const dispatch = useDispatch();
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

    const createdReview = await dispatch(makeReviewThunk(productId.productId, payload))
    if (!createdReview.id) {
      setErrors(createdReview);
    } else {
      closeModal()
    }
  };


  return sessionUser.id ? (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div>
        <p>Write a Review:</p>
        <input
          type="text"
          placeholder="Review here"
          value={body}
          onChange={updateBody}
          required
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