import './UserDetails.css'

import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const UserDetail = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const [currentUser, setUser] = useState([]);

    let userState = useSelector((state) => state.session);
    let userId = userState.user.id

    useEffect(() => {
        const fetchData = async () => {
          const productsResponse = await fetch('/api/products');
          const productsData = await productsResponse.json();
          setAllProducts(productsData.products);
    
          const reviewsResponse = await fetch('/api/products/reviews/current_user');
          const { reviews } = await reviewsResponse.json();
          setAllReviews(reviews);
         
          const userResponse = await fetch(`/api/products/${userId}`);
          const { user } = await userResponse.json();
          setUser(user);
        }
        fetchData();
      }, []);

      
    let productArr;
    productArr = allProducts.filter((product) => {
        if (product.user.id === userState.user.id) {
            return product;
        }
    });

   console.log(currentUser)
return (
    <div>
        <div class='user-detail-user-info'>
            <img src={currentUser.imageURL} alt='img' class='user-detail-user-image'/>
            <h2>{currentUser.firstName}</h2>
        </div>
        <div><h2>My Products</h2></div>
        <div class='user-detail-product-arrange'>{
            productArr && productArr.map((product) => (
                <div key={product.id} class='user-detail-product-card'>
                    <Link to={`/products/${product.id}`}><img src={product.imageURL} alt='img' class='user-detail-product-image'/></Link>
                    <div>
                        <span class='user-detail-product-title'><Link to={`/products/${product.id}`}>{product.title}</Link></span>
                        <br></br><span class='user-detail-product-price'>${product.price}</span>
                        <br></br><span class='user-detail-product-price'>{product.description}</span>
                    </div>
                    </div>

            ))
        }</div>
        <br></br>
        <div><h2>My Reviews</h2></div>
        <div class='user-detail-product-arrange'>{
            allReviews && allReviews.map((review) => (
                <div key={review.id} class='user-detail-product-card'>
                    <Link to={`/products/${review.product.id}`}><img src={review.product.imageURL} alt='img' class='user-detail-product-image'/></Link>
                    <div>
                    <span class='user-detail-product-title'><Link to={`/products/${review.product.id}`}>{review.product.title}</Link></span>
                    <br></br>{review.body}
                    </div>
                </div>

            ))
        }</div>
    </div>
)
}


export default UserDetail
