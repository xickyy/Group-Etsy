import "./ProductPage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { oneProductThunk } from "../../store/products";
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    let { productId } = useParams()

    useEffect(() => {
        dispatch(oneProductThunk(productId)).then(() => setIsLoaded(true));
    }, [dispatch, productId]);

    let productState = useSelector(state => state.products.product)

    let reviewsArr
    if(isLoaded){
        reviewsArr = Object.values(productState.reviews)
    }

    return (
        <div>
            { productState && reviewsArr &&
            <div>
                <div>{productState.title}</div>
                <img src={productState.imageURL} alt= ''/>
                <div>{productState.price}</div>
                <div>{productState.description}</div>
                {reviewsArr.map((review) => (
                    <div>{review.body}</div>
                ))}
            </div>
            }
        </div>
    )
}

export default ProductPage;
