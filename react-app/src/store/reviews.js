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
    dispatch(getReviewsByProductId(data.products));
    return res;
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {

    };
};