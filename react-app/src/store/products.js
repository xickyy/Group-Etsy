// import { csrfFetch } from "./csrf";

const GET_PRODUCTS = "products/getProducts";
const ADD_PRODUCT = "products/addProduct";
const GET_ONE_PRODUCT = "products/getOneProduct";
const DELETE_PRODUCT = "products/deleteProduct";

const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  };
};

const getOneProduct = (product) => {
  return {
    type: GET_ONE_PRODUCT,
    product,
  };
};

const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id,
  };
};

export const deleteProductThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteProduct(id));
  }
};

export const allProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch(getProducts(data.products));
  return res;
};

export const oneProductThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}`);
  const data = await res.json();
  dispatch(getOneProduct(data));
  return res;
};

export const makeProductThunk = (product) => async (dispatch) => {
  const res = await fetch("/api/products/new", {
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
  let newState = { ...state };
  switch (action.type) {
    case GET_PRODUCTS:
      action.products.forEach((product) => {
        newState[product.id] = product;
      });
      return newState;
    case ADD_PRODUCT:
      newState[action.product.id] = action.product;
      return newState;
    case GET_ONE_PRODUCT:
      delete newState.products;
      newState = action.product;
      return newState;
    case DELETE_PRODUCT:
      newState = {};
      return newState;
    default:
      return newState;
  }
};

export default productReducer;
