import "./ReviewCard.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../EditReviewForm";

const ReviewCard = ({ review, setHasReview }) => {
  const { productId } = useParams();
  const userState = useSelector((state) => state.session);

  const dispatch = useDispatch();

  if (review.user.id === userState.user?.id) {
    setHasReview(true);
  }

  const editReviewInfo = () => {
    if (userState.user && review && userState.user.id === review.user.id) {
      return (
        <OpenModalButton
          buttonText="Edit Your Review"
          modalComponent={
            <EditReviewForm review={review} productId={productId} />
          }
        />
      );
    }
  };

  const reviewDeleter = () => {
    const confirm = window.confirm(
      `Are you sure you wish to delete your review?`
    );
    if (confirm) {
      dispatch(deleteReviewThunk(productId, review)).then(() => {
        setHasReview(false);
      });
    }
  };

  const deleteReview = (e) => {
    if (userState.user && review && userState.user.id === review.user.id) {
      return (
        <button
          className="review-card-delete-button"
          onClick={() => {
            reviewDeleter();
          }}
        >
          Delete Review
        </button>
      );
    }
  };

  return (
    <div>
      <div className="product-page-rev-spacing">
        <u>Rated</u>: {review.stars}/5 Stars
        <div className="review-card-review-body">{review.body}</div>
        <div className="product-page-user-img-name-container">
          {" "}
          <img
            className="product-page-user-img"
            src={
              review.user.imageURL ||
              "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/755c80088d2c6fd111162efa8235ecda~c5_720x720.jpeg?x-expires=1678694400&x-signature=MxBth9PCTul3xkjPNsPVBWzHWfg%3D"
            }
            alt=""
          ></img>
          <div className="review-card-first-name">{review.user.firstName}</div>
        </div>
        <div className="product-page-edit-rev-buttons">
          {editReviewInfo()}
          {deleteReview()}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
