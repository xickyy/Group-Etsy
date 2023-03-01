import { csrfFetch } from "./csrf";

const GET_PRODUCTS = "products/getProducts";
const ADD_PRODUCT = "products/addProduct";

const getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    };
};

const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        product
    };
};

export const allProductsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/products');
    const data = await res.json();
    dispatch(getProducts(data.products))
    return res;
};

export const makeProductThunk = (product) => async (dispatch) => {
    const res = await csrfFetch('/api/products', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });

    if (res.ok) {
        const newProduct = await res.json();
        dispatch(addProduct(newProduct));
        return newProduct;
    }
};

const initialState = {};

const productReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_PRODUCTS:
            action.products.forEach((product) => {
                newState[product.id] = product
            });
            return newState;
        case ADD_PRODUCT:
            newState[action.product.id] = action.product;
            return newState;
        default: 
            return newState
    }
}

export default productReducer;