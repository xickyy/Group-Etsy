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
  };

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
      dispatch(deleteReviewThunk(productId, review)).then(() => {
        setHasReview(false);
      });
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
      <div className="product-page-rev-spacing">
        <u>Rated</u>: {review.stars}/5 Stars
        <div>{review.body}</div>
        <div className="product-page-user-img-name-container"> <img className="product-page-user-img" src={review.user.imageURL} alt=''></img>{review.user.firstName}</div>
        <div className="product-page-edit-rev-buttons">
          {editReviewInfo()}
          {deleteReview()}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
