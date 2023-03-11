const GET_PRODUCTS = "products/getProducts";
const ADD_PRODUCT = "products/addProduct";
const GET_ONE_PRODUCT = "products/getOneProduct";
const EDIT_PRODUCT = "products/editProduct";
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

const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product,
  };
};

const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id,
  };
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
  } else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const editProductThunk = (product) => async (dispatch) => {
  const res = await fetch(`/api/products/${product.productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (res.ok) {
    const productEdited = await res.json();
    dispatch(editProduct(productEdited));
    return productEdited;
  }
};

export const deleteProductThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteProduct(id));
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
      newState[action.product.id] = action.product;
      return newState;
    case EDIT_PRODUCT:
      newState[action.product.id] = action.product;
      return newState;
    case DELETE_PRODUCT:
      delete newState[action.id]
      return newState;
    default:
      return newState;
  }
};

export default productReducer;
