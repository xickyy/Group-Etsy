const GET_REVIEWS_PRODUCT = "products/getReviewsByProductId";
const ADD_REVIEW = "products/addReview";
const GET_ONE_REVIEW = "products/getOneReview";
const EDIT_REVIEW = "products/editReview";
const DELETE_REVIEW = "products/deleteReview";

const getReviewsByProductId = (reviews) => {
  return {
    type: GET_REVIEWS_PRODUCT,
    reviews,
  };
};

const getOneReview = (review) => {
  return {
    type: GET_ONE_REVIEW,
    review,
  };
};

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
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
  console.log("DATA IN REVIEW THUNK #####", data)
  dispatch(getReviewsByProductId(data.reviews));
  console.log("AFTER THE REDUCER DISPATCH")
  return res;
};

export const oneReviewThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}`);
  const data = await res.json();
  dispatch(getOneReview(data));
  return res;
};

export const makeReviewThunk = (productId, review) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const newReview = await res.json();
        dispatch(addReview(newReview));
        return newReview;
    }
};

export const editReviewThunk = (review) => async (dispatch) => {
  const res = await fetch(`/api/products/${review.productId}/reviews/${review.reviewId}`, {
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
      newState = {};
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case ADD_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case EDIT_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
