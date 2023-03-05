import "./ProductPage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { oneProductThunk, deleteProductThunk } from "../../store/products";
import { useParams, useHistory } from "react-router-dom";
import CreateReviewForm from "../CreateReviewForm";
import OpenModalButton from "../OpenModalButton";

const ProductPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  let { productId } = useParams();

  useEffect(() => {
    dispatch(oneProductThunk(productId)).then(() => setIsLoaded(true));
  }, [dispatch, productId]);

  let productState = useSelector((state) => state.products);
  let userState = useSelector((state) => state.session);

  let reviewsArr;
  if (isLoaded) {
    reviewsArr = Object.values(productState.reviews);
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

  const refreshPage = () => {
    window.location.reload(false);
  }

  const userAddReview = () => {
    if (userState.user && userState.user.id !== productState.user.id) {
      return <OpenModalButton
      buttonText="Create a Review"
      onClick={refreshPage}
      modalComponent={<CreateReviewForm productId={productId} />}
    />
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
          {reviewsArr && reviewsArr.map((review) => (
            <div key={review.id}>
              <div>{review.body}</div>
              <div>Rating: {review.stars}/5</div>
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
