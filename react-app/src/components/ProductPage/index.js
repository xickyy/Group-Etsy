import "./ProductPage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { oneProductThunk, deleteProductThunk } from "../../store/products";
import { useParams, useHistory } from 'react-router-dom'

const ProductPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    let { productId } = useParams()

    useEffect(() => {
        dispatch(oneProductThunk(productId)).then(() => setIsLoaded(true));
    }, [dispatch, productId]);

    let productState = useSelector(state => state.products)
    let userState = useSelector(state => state.session)

    let reviewsArr
    if(isLoaded){
        reviewsArr = Object.values(productState.reviews)
    }
    console.log('heyyyyyyyyyy', reviewsArr)


    const productDeleter = () => {
        const confirm = window.confirm(`Are you sure you wish to delete the product "${productState.title}"`)
        if (confirm) {
          dispatch(deleteProductThunk(productId))
          history.push("/products")
        }
      }

    const userDeleteProduct = () => {
        if (userState.user && userState.user.id === productState.user.id) {
          return <button onClick={() => { productDeleter() }}>Delete Product</button>
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
