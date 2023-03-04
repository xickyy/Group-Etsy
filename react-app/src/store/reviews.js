const GET_REVIEWS_PRODUCT = "products/getReviewsByProductId";
const ADD_REVIEW = "products/addReview";

const getReviewsByProductId = (reviews) => {
    return {
        type: GET_REVIEWS_PRODUCT,
        reviews
    };
};

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
};

export const allReviewsByProductIdThunk = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`);
    const data = await res.json();
    dispatch(getReviewsByProductId(data.products));
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

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_REVIEWS_PRODUCT:
            action.reviews.forEach((review) => {
                newState[review.id] = review;
            });
            return newState;
        case ADD_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
    default:
        return state;
    };
};

export default reviewReducer;