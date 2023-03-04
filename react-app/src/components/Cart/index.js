import './Cart.css'

import React, { useState, useEffect } from 'react'

const Cart = ({ data }) => {
    console.log('#####CartData',data)
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        setCart([product]);
    } 

    return (
        <div className = 'cart'>
            <h2>Cart</h2>
        </div>
)


}


export default Cart
