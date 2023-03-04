const ADD_CART = "carts/addCart"
const GET_CART = "carts/getCartItems"


const addItemToCart = (productId,userId) => {
    return {
        type: ADD_CART,
        productId,
        userId
    };
};

const getCartItems = (cartItems) => {
    return {
      type: GET_CART,
      cartItems,
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

const initialState = {};

const cartReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_CART:
      newState[action.productId] = action.productId;
      return newState;
    case GET_CART:
        action.cartItems.cartItems.forEach((cartItem) => {
            newState[cartItem.id] = cartItem;
        });
        return newState;
    default:
      return newState;
  }
};

export default cartReducer;
