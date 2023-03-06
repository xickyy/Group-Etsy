const GET_REVIEWS_PRODUCT = "products/getReviewsByProductId";
const EDIT_REVIEW = "products/editReview";
const DELETE_REVIEW = "products/deleteReview";

const getReviewsByProductId = (reviews) => {
  return {
    type: GET_REVIEWS_PRODUCT,
    reviews,
  };
};

const editReview = (review) => {
  return {
    type: EDIT_REVIEW,
    review,
  };
};

const deleteReview = (review) => {
  return {
    type: DELETE_REVIEW,
    review,
  };
};

export const allReviewsByProductIdThunk = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/reviews`);
  const data = await res.json();
  dispatch(getReviewsByProductId(data.reviews));
  return res;
};

export const makeReviewThunk = (productId, reviews) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviews),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(allReviewsByProductIdThunk(productId));
    return newReview;
  }
};

export const editReviewThunk = (productId, review) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/reviews/${review.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const editedReview = await res.json();
    dispatch(editReview(editedReview));
    return editedReview;
  }
};

export const deleteReviewThunk = (productId, review) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/reviews/${review.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(review));
  }
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_REVIEWS_PRODUCT:
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case EDIT_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      delete newState[action.review.id];
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
