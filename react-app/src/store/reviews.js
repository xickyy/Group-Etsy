const GET_REVIEWS_PRODUCT = "products/getReviewsByProductId";

const getReviewsByProductId = (reviews) => {
    return {
        type: GET_REVIEWS_PRODUCT,
        reviews
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
        body: JSON.stringify(reviews)
    });

    if (res.ok) {
        const newReview = await res.json();
        dispatch(allReviewsByProductIdThunk(productId));
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
    default:
        return state;
    };
};

export default reviewReducer;