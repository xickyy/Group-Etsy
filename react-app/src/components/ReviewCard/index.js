
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../EditReviewForm";
import { allReviewsByProductIdThunk } from "../../store/reviews";

const ReviewCard = ({ review }) => {
    const history = useHistory();
    const { productId } = useParams();
    const userState = useSelector((state) => state.session);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allReviewsByProductIdThunk(productId));
      }, [dispatch, productId]);
  
    const editReviewInfo = () => {
      if (userState.user && review) {
        return (
          <OpenModalButton
            buttonText="Edit Your Review"
            modalComponent={<EditReviewForm review={review} productId={productId} />}
          />
        );
      }
      history.push(`/products/${productId}`);
    };

    const reviewDeleter = () => {
      const confirm = window.confirm(
        `Are you sure you wish to delete your review?`
      );
      if (confirm) {
        dispatch(deleteReviewThunk(productId, review));
        window.location.reload()
      }
    };
  
    const deleteReview = (e) => {
      if (userState.user && review) {
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
        <div>
          <div>{review.body}</div>
          <u>Rated</u>: {review.stars}/5
        </div>
        <div>
            {editReviewInfo()}
        </div>
        <div>
            {deleteReview()}
        </div>
      </div>
    );
  };
  
  export default ReviewCard;