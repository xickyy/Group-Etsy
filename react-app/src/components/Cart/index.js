import './Cart.css'
import React, { useState, useEffect } from 'react'
import { allCartItemsThunk } from '../../store/cart.js'
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allCartItemsThunk()).then(()=> setIsLoaded(true))
    },[dispatch])

    let cartState = useSelector(state => state.products) 
    // console.log('products######',cartState)

    // let cartState2 = useSelector(state => state.cartItems)
    // console.log('cartItems######',cartState2)


    return (
        <div className = 'cart'>
            <h2>Cart</h2>
            {cartState.title}
        </div>
)


}


export default Cart
