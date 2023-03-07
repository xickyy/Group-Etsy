import './Cart.css'
import React, { useState, useEffect } from 'react'
import { allCartItemsThunk, deleteCartItemsThunk } from '../../store/cart.js'
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allCartItemsThunk()).then(()=> setIsLoaded(true))
    },[dispatch])

    let cartState = useSelector(state => state.cart) 

    let cartItems
    if(isLoaded){
        cartItems = Object.values(cartState)
    }

    const userDeleteCartItems = (id) => {
          return <button onClick={() => { dispatch(deleteCartItemsThunk(id)) }}>Delete</button>
      }

    return (
        <div>
        {
            cartItems && cartItems.map((product) => (
                <div key={product.id}>
                    <div>{product.product.title} {userDeleteCartItems(product.id)}</div>
                </div>
            ))
        }
    </div>
)


}


export default Cart
