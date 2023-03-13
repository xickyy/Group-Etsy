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
  const [firstStar, setFirstStar] = useState("fa-sharp fa-regular fa-star");
  const [secondStar, setSecondStar] = useState("fa-sharp fa-regular fa-star");
  const [thirdStar, setThirdStar] = useState("fa-sharp fa-regular fa-star");
  const [fourthStar, setFourthStar] = useState("fa-sharp fa-regular fa-star");
  const [fifthStar, setFifthStar] = useState("fa-sharp fa-regular fa-star");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const updateBody = (e) => setBody(e.target.value);
  // const updateStars = (e) => setStars(e.target.value);

  const handleFirstStar = () => {
    setFirstStar("fa-sharp fa-solid fa-star");
    setSecondStar("fa-sharp fa-regular fa-star");
    setThirdStar("fa-sharp fa-regular fa-star");
    setFourthStar("fa-sharp fa-regular fa-star");
    setFifthStar("fa-sharp fa-regular fa-star");
    setStars(1);
  };

  const handleSecondStar = () => {
    setFirstStar("fa-sharp fa-solid fa-star");
    setSecondStar("fa-sharp fa-solid fa-star");
    setThirdStar("fa-sharp fa-regular fa-star");
    setFourthStar("fa-sharp fa-regular fa-star");
    setFifthStar("fa-sharp fa-regular fa-star");
    setStars(2);
  };

  const handleThirdStar = () => {
    setFirstStar("fa-sharp fa-solid fa-star");
    setSecondStar("fa-sharp fa-solid fa-star");
    setThirdStar("fa-sharp fa-solid fa-star");
    setFourthStar("fa-sharp fa-regular fa-star");
    setFifthStar("fa-sharp fa-regular fa-star");
    setStars(3);
  };

  const handleFourthStar = () => {
    setFirstStar("fa-sharp fa-solid fa-star");
    setSecondStar("fa-sharp fa-solid fa-star");
    setThirdStar("fa-sharp fa-solid fa-star");
    setFourthStar("fa-sharp fa-solid fa-star");
    setFifthStar("fa-sharp fa-regular fa-star");
    setStars(4);
  };

  const handleFifthStar = () => {
    setFirstStar("fa-sharp fa-solid fa-star");
    setSecondStar("fa-sharp fa-solid fa-star");
    setThirdStar("fa-sharp fa-solid fa-star");
    setFourthStar("fa-sharp fa-solid fa-star");
    setFifthStar("fa-sharp fa-solid fa-star");
    setStars(5);
  };

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
      <div className="create-review-modal">
        <p>Write a Review:</p>
        <input
          type="text"
          placeholder="Review here"
          value={body}
          onChange={updateBody}
          required
        />

        <p>How would you rate this product?</p><br></br>
        {/* <input
          type="number"
          placeholder="Stars here"
          value={stars}
          onChange={updateStars}
          min="1"
          max="5"
        /> */}

        <div className="create-review-stars">
        <i title="Disappointed" style={{fontSize: "30px"}} onClick={handleFirstStar} className={firstStar}></i>
        <i title="Not a fan" style={{fontSize: "30px"}} onClick={handleSecondStar} className={secondStar}></i>
        <i title="It's okay" style={{fontSize: "30px"}} onClick={handleThirdStar} className={thirdStar}></i>
        <i title="Like it" style={{fontSize: "30px"}} onClick={handleFourthStar} className={fourthStar}></i>
        <i title="Love it" style={{fontSize: "30px"}} onClick={handleFifthStar} className={fifthStar}></i>
        </div>

        <div>
          <button className="create-review-button" type="submit">
            Create New Review
          </button>
        </div>
      </div>
    </form>
  ) : null;
};

export default CreateReviewForm;