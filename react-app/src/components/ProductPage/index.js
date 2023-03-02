import "./ProductPage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { oneProductThunk, deleteProductThunk } from "../../store/products";
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    let { productId } = useParams()

    useEffect(() => {
        dispatch(oneProductThunk(productId)).then(() => setIsLoaded(true));
    }, [dispatch, productId]);

    let productState = useSelector(state => state.products.product)
    let userState = useSelector(state => state.session)

    let reviewsArr
    if(isLoaded){
        reviewsArr = Object.values(productState.reviews)
    }

    const userDeleteProduct = () => {
        if (userState.user && userState.user.id === productState.user.id) {
          return <button onClick={() => { deleteProductThunk() }}>Delete Product</button>
        }
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
                    <div key={review.id}>{review.body}</div>
                ))}
                {userDeleteProduct()}
            </div>
            }
        </div>
    )
}

export default ProductPage;
