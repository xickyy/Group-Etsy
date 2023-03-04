import './Cart.css'

import React, { useState, useEffect } from 'react'
import { allCartItemsThunk } from '../../store/cart.js'
import { useSelector, useDispatch } from "react-redux";

const Cart = ({ data }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allCartItemsThunk()).then(()=> setIsLoaded(true))
    },[dispatch])

    return (
        <div className = 'cart'>
            <h2>Cart</h2>
        </div>
)


}


export default Cart
