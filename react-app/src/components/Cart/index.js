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
        return <button onClick={() => { dispatch(deleteCartItemsThunk(id)) }}>Delete</button>
    }

    console.log('cartitemss', cartItems)

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
            <div>
                {
                    cartItems && cartItems.map((product) => (
                        <div key={product.id}>
                            <div>{product.product.title} {userDeleteCartItems(product.id)}</div>
                            <Link to={`/products/${product.product.id}`} ><img src={product.product.imageURL} alt='img' /></Link>
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
