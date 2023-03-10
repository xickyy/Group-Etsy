import './UserDetails.css'

import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const UserDetail = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [allReviews, setAllReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const productsResponse = await fetch('/api/products');
          const productsData = await productsResponse.json();
          setAllProducts(productsData.products);
    
          const reviewsResponse = await fetch('/api/products/reviews/current_user');
          const { reviews } = await reviewsResponse.json();
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
        <div><h2>My Products</h2></div>
        {
            productArr && productArr.map((product) => (
                <div key={product.id}>
                    <Link to={`/products/${product.id}`}><img src={product.imageURL} alt='img' class='user-detail-product-image'/></Link>
                    {product.title}
                    </div>

            ))
        }
        <br></br>
        <div><h2>My Reviews</h2></div>
        {
            allReviews && allReviews.map((review) => (
                <div key={review.id}>{review.product.title}: {review.body}</div>

            ))
        }
    </div>
)
}


export default UserDetail
