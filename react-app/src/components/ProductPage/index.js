import "./ProductPage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { oneProductThunk, deleteProductThunk } from "../../store/products";
import { allReviewsByProductIdThunk, deleteReviewThunk } from "../../store/reviews";
import { useParams, useHistory } from "react-router-dom";
import CreateReviewForm from "../CreateReviewForm";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../EditReviewForm";

const ProductPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(oneProductThunk(productId)).then(() => setIsLoaded(true));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(allReviewsByProductIdThunk(productId));
  }, [dispatch, productId]);

  let productState = useSelector((state) => state.products);
  let userState = useSelector((state) => state.session);
  let reviewState = useSelector((state) => state.reviews);

  let reviewsArr;
  let reviewUserId;
  let reviewId;
  if (isLoaded) {
    reviewsArr = Object.values(reviewState);
    reviewUserId = reviewsArr.filter((review) => {
      if (userState.user.id === review.user.id) {
        return true
      }
      return false
    })

    reviewId = reviewsArr.map((review) => {
      return review.id
    })
  }

  const editProductInfo = () => {
    history.push(`/products/${productId}/edit`);
  };

  const productDeleter = () => {
    const confirm = window.confirm(
      `Are you sure you wish to delete the product "${productState.title}"`
    );
    if (confirm) {
      dispatch(deleteProductThunk(productId));
      history.push("/products");
    }
  };

  const reviewDeleter = () => {
    const confirm = window.confirm(
      `Are you sure you wish to delete your review?`
    );
    if (confirm) {
      dispatch(deleteReviewThunk(reviewId)); // INCORRECT FIX LATER
      history.push(`/products/${productId}`);
    }
  };

  const userDeleteProduct = () => {
    if (userState.user && userState.user.id === productState.user.id) {
      return (
        <button
          onClick={() => {
            productDeleter();
          }}
        >
          Delete Product
        </button>
      );
    }
  };

  const userEditProduct = () => {
    if (userState.user && userState.user.id === productState.user.id) {
      return (
        <button
          onClick={() => {
            editProductInfo();
          }}
        >
          Edit Product
        </button>
      );
    }
  };

  const userAddReview = () => {
    if (userState.user && userState.user.id !== productState.user.id) {
      return (
        <OpenModalButton
          buttonText="Create a Review"
          modalComponent={<CreateReviewForm productId={productId} />}
        />
      );
    }
  };

  const userEditReview = () => {
    if (userState.user && reviewUserId) {
      return (
        <OpenModalButton
          buttonText="Edit Your Review"
          modalComponent={<EditReviewForm productId={productId} />}
        />
      );
    }
  };

  const userDeleteReview = () => {
    if (userState.user && reviewUserId) {
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
      {productState && reviewsArr && (
        <div>
          <div>{productState.title}</div>
          <img src={productState.imageURL} alt="" />
          <div>{productState.price}</div>
          <div>{productState.description}</div>
          {reviewsArr &&
            reviewsArr.map((review) => (
              <div key={review.id}>
                <div>{review.body}</div>
                <div>Rating: {review.stars}/5</div>
                {userEditReview()}
                {userDeleteReview()}
              </div>
            ))}
          {userEditProduct()}
          {userDeleteProduct()}

          {userAddReview()}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
