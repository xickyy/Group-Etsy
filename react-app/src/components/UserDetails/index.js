import './UserDetails.css'

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

const UserDetail = ({ placeholder, data }) => {

    const [allProducts, setAllProducts] = useState([]);
    const [allReviews, setAllReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const productsResponse = await fetch('/api/products');
          const productsData = await productsResponse.json();
          setAllProducts(productsData.products);
    
          const reviewsResponse = await fetch('/api/products/reviews/current_user');
          const { reviews }  = await reviewsResponse.json();
          setAllReviews(reviews);
        }
        fetchData();
      }, []);

      
    let userState = useSelector((state) => state.session);


    let productArr;
    productArr = allProducts.filter((product) => {
        if (product.user.id === userState.user.id) {
            return product;
        }
    });
   
return (
    <div>
        <div>Products</div>
        {
            productArr && productArr.map((product) => (
                <div key={product.id}>{product.title}</div>

            ))
        }
        <br></br>
        <div>Reviews</div>
        {
            allReviews && allReviews.map((review) => (
                <div key={review.id}>{review.product.title}: {review.body}</div>

            ))
        }
    </div>
)
}


export default UserDetail
