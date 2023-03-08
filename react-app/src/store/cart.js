const ADD_CART = "carts/addCart"
const GET_CART = "carts/getCartItems"
const DELETE_CART = "carts/deleteCartItems";


const addItemToCart = (item) => {
    return {
        type: ADD_CART,
        item
    };
};

const getCartItems = (cartItems) => {
    return {
      type: GET_CART,
      cartItems,
    };
  };
  
const deleteCartItems = (cartItem) => {
    return {
      type: DELETE_CART,
      cartItem,
    };
  };

export const addCartThunk = ( ids ) => async (dispatch) => {
    const res = await fetch("/api/cart_items/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ids)
    });

    if (res.ok){
        const cartItem = await res.json()
        dispatch(addItemToCart(cartItem));
        return cartItem
    }
};

export const allCartItemsThunk = () => async (dispatch) => {
    const res = await fetch("/api/cart_items/");
    const data = await res.json();
    dispatch(getCartItems(data));
    return res;
};

export const deleteCartItemsThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/cart_items/${id}`, {
      method: "DELETE",
    });
  
    if (res.ok) {
      dispatch(deleteCartItems(id));
    }
  };
  

const initialState = {};

const cartReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_CART:
      newState[action.item.id] = action.item;
      return newState;
    case GET_CART:
        action.cartItems.cartItems.forEach((cartItem) => {
            newState[cartItem.id] = cartItem;
        });
        return newState;
    case DELETE_CART:
      delete newState[action.cartItem]
      return newState;
    default:
      return newState;
  }
};

export default cartReducer;
