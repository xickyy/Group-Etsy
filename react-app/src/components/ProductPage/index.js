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
  const [hasReview, setHasReview] = useState(false);

  useEffect(() => {
    dispatch(oneProductThunk(productId))
      .then(dispatch(allReviewsByProductIdThunk(productId)))
      .then(() => setIsLoaded(true));
  }, [dispatch, productId]);

  let productState = useSelector((state) => state.products);
  let userState = useSelector((state) => state.session);

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
  }

  if (isLoaded) {
    individualRevArr = individualRevArr.filter((review) => {
      if (review.product.id === parseInt(productId)) {
        return Object.values(review);
      }
    });
  }

  const editProductInfo = () => {
    if (
      userState.user &&
      userState.user.id === productState[productId].user.id
    ) {
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
      dispatch(deleteProductThunk(productId)).then(() => {
        history.push("/")
      });
    }
  };

  const userDeleteProduct = () => {
    if (
      userState.user &&
      userState.user.id === productState[productId].user.id
    ) {
      return (
        <button
          className="product-page-delete-button"
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
    if (userState.user && userState.user.id !== productState[productId].user.id) {
      return (
        <button
          className="product-page-cart-button"
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
      userState.user?.id !== productState[productId].user.id &&
      !hasReview
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
        <div className="product-page-container">
          <div className="product-page-rev-img">
            <img
              className="product-page-img"
              src={productState[productId].imageURL || "http://www.rcdrilling.com/wp-content/uploads/2013/12/default_image_01-1024x1024-570x760.png"}
              alt=""
            />
            <div className="product-page-rev">
              <h3 className="product-page-reviews-header">Reviews for this item</h3>
              <hr></hr><br></br>
              {userAddReview()}
              {individualRevArr.length > 0 &&
                individualRevArr.map((review) => {
                  return (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      setHasReview={setHasReview}
                    />
                  );
                })}
            </div>
          </div>
          <div className="product-page-details">
            <h3 className="product-page-details-price">{`$${productState[productId].price}`}</h3>
            <div className="product-page-details-text">
              {productState[productId].title}
            </div>
            {userAddCart()}
            <div className="product-page-details-text">
              <h4>Description:</h4> {productState[productId].description}
            </div>
            <br></br>
            <div className="product-page-returns-exchanges">
              <b>Returns & exchanges:</b>
              <br>
              </br>
              Not accepted, but please contact me <br></br>if you have problems with your order.
              <br></br>
              <br>
              </br>
              <b>Epsy Purchase Protection:</b>
              <br></br>
              Shop confidently on Epsy knowing if something goes wrong with an order, we've got your back for all eligible purchases.
            </div>
      
            <div className="product-page-edit-del">
              {editProductInfo()}
              {userDeleteProduct()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
