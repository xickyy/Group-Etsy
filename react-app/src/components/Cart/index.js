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

    let cartState = useSelector(state => state.cart) 

    let cartItems
    if(isLoaded){
        cartItems = Object.values(cartState)
    }

    return (
        <div>
        {
            cartItems && cartItems.map((product) => (
                <div key={product.id} product={product}>
                    <div>{product.product}</div>
                </div>
            ))
        }
    </div>
)


}


export default Cart
