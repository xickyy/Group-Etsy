const ADD_CART = "carts/addCart"


const addItemToCart = (productId,userId) => {
    return {
        type: ADD_CART,
        productId,
        userId
    };
};

export const addCartThunk = ( ids ) => async (dispatch) => {
    console.log('###ids',ids)
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

const initialState = {};

const cartReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_CART:
      console.log('#####action',action)
      newState[action.productId] = action.product;
      return newState;
    default:
      return newState;
  }
};

export default cartReducer;