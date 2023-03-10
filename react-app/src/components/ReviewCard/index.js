import "./ReviewCard.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../EditReviewForm";

const ReviewCard = ({ review }) => {
    const { productId } = useParams();
    const userState = useSelector((state) => state.session);

    const dispatch = useDispatch();

    const editReviewInfo = () => {
      if (userState.user && review && (userState.user.id === review.user.id)) {
        return (
          <OpenModalButton
            buttonText="Edit Your Review"
            modalComponent={<EditReviewForm review={review} productId={productId} />}
          />
        );
      }
    };

    const reviewDeleter = () => {
      const confirm = window.confirm(
        `Are you sure you wish to delete your review?`
      );
      if (confirm) {
        dispatch(deleteReviewThunk(productId, review));
      }
    };


    const deleteReview = (e) => {
      if (userState.user && review && (userState.user.id === review.user.id)) {
        return (
          <button
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
          <h3>Reviews</h3>
        <div>
          <div>{review.user.firstName}- {review.body}</div>
          <u>Rated</u>: {review.stars}/5 Stars
        </div>
        <div>
            {editReviewInfo()}
            {deleteReview()}
        </div>
      </div>
    );
  };

  export default ReviewCard;
