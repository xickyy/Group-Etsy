import "./ProductPage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { oneProductThunk, deleteProductThunk } from "../../store/products";
import { allReviewsByProductIdThunk } from "../../store/reviews";
import { useParams, useHistory } from "react-router-dom";
import CreateReviewForm from "../CreateReviewForm";
import OpenModalButton from "../OpenModalButton";
import ReviewCard from "../ReviewCard";

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
  if (isLoaded) {
    reviewsArr = Object.values(reviewState)
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


  return (
    <div>
      {productState && reviewsArr && (
        <div>
          <div>{productState.title}</div>
          <img src={productState.imageURL} alt="" />
          <div>{productState.price}</div>
          <div>{productState.description}</div>

          {reviewsArr.length > 0 &&
            reviewsArr.map((review) => {
              return <ReviewCard key={review.id} review={review} />;
            })}
          {userEditProduct()}
          {userDeleteProduct()}

          {userAddReview()}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
