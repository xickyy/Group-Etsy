import './Cart.css'
import React, { useState, useEffect } from 'react'
import { allCartItemsThunk, deleteCartItemsThunk } from '../../store/cart.js'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

const Cart = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allCartItemsThunk()).then(() => setIsLoaded(true))
    }, [dispatch])

    let cartState = useSelector(state => state.cart)

    let cartItems
    if (isLoaded) {
        cartItems = Object.values(cartState)
    }

    const userDeleteCartItems = (id) => {
        return <button className="cart-delete-btn" onClick={() => { dispatch(deleteCartItemsThunk(id)) }}>Remove</button>
    }

    let cartReturn;
    if (isLoaded && cartItems && (cartItems.length === 0)) {
        cartReturn = (
            <>
                <h2>Your cart is empty.</h2>
                <a href='/products/'>Discover something unique to fill it up.</a>
            </>
        )
    } else {
        cartReturn = (
            <div class='cart-list'>
                {
                    cartItems && cartItems.map((product) => (
                        <div key={product.id}>
                            <div class="cart-product-info">
                                <Link to={`/products/${product.product.id}`}><img src={product.product.imageURL} alt='img' class='cart-product-image' /></Link>
                                <div class="cart-product-details">
                                    <span class='cart-product-title'><Link to={`/products/${product.product.id}`}>{product.product.title}</Link></span>
                                    <div class='cart-product-actions'>
                                        {userDeleteCartItems(product.id)}
                                    </div>
                                </div>
                                <span class='cart-product-price'>${product.product.price}</span>
                            </div>
                            <hr />
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        cartReturn
    )


}


export default Cart
