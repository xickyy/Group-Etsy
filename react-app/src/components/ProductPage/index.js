import "./ProductPage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { oneProductThunk, deleteProductThunk } from "../../store/products";
import { addCartThunk } from "../../store/cart";
import { allReviewsByProductIdThunk } from "../../store/reviews";
import { useParams, useHistory } from "react-router-dom";
import CreateReviewForm from "../CreateReviewForm";
import OpenModalButton from "../OpenModalButton";
import ReviewCard from "../ReviewCard";
import EditProductForm from "../EditProductForm";

const ProductPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(oneProductThunk(productId))
      .then(dispatch(allReviewsByProductIdThunk(productId)))
      .then(() => setIsLoaded(true));
  }, [dispatch, productId]);

  let productState = useSelector((state) => state.products);
  let userState = useSelector((state) => state.session);
  console.log("####",productState)

  let userId;
  if (userState.user) {
    userId = userState.user.id;
  }

  const payload = {
    productId,
    userId,
  };

  let reviewState = useSelector((state) => state.reviews);
  let individualRevArr = [];

  if (isLoaded) {
    individualRevArr = Object.values(reviewState);
  };

  if (isLoaded && userState.user) {
    individualRevArr = individualRevArr.filter((review) => {
      if (review.user.id === userState.user.id) {
        return Object.values(review);
      }
    });
  }

  const editProductInfo = () => {
    if (userState.user && (userState.user.id === productState[productId].user.id)) {
      return (
        <OpenModalButton
          buttonText="Edit Your Product"
          modalComponent={<EditProductForm product={productState[productId]} />}
        />
      );
    }
  };

  const productDeleter = () => {
    const confirm = window.confirm(
      `Are you sure you wish to delete the product "${productState[productId].title}"?`
    );
    if (confirm) {
      dispatch(deleteProductThunk(productId));
      history.push("/");
    }
  };

  const userDeleteProduct = () => {
    if (userState.user && (userState.user.id === productState[productId].user.id)) {
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

  const handleAddToCart = () => {
    dispatch(addCartThunk(payload));
    history.push("/cart_items");
  };

  const userAddCart = () => {
    if (userState.user) {
      return (
        <button
          onClick={() => {
            handleAddToCart();
          }}
        >
          Add to Cart
        </button>
      );
    }
  };

  const userAddReview = () => {
    if (
      userState.user &&
      userState.user.id !== productState[productId].user.id &&
      individualRevArr.length === 0
    ) {
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
      {productState[productId] && individualRevArr && (
        <div>
          <div>{productState[productId].title}</div>
          <img src={productState[productId].imageURL} alt="" />
          <div>Price: ${productState[productId].price}</div>
          <div>Description: {productState[productId].description}</div>
          {userAddCart()}
          {individualRevArr.length > 0 &&
            individualRevArr.map((review) => {
              return <ReviewCard key={review.id} review={review} />;
            })}
          {editProductInfo()}
          {userDeleteProduct()}

          {userAddReview()}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
