import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { allProductsThunk } from "../../store/products";
import { Link } from "react-router-dom"

const ProductsList = (products) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(allProductsThunk()).then(()=> setIsLoaded(true))
    }, [dispatch])

    let productsState = useSelector(state => state.products)
  
    let PRODUCTS
    if(isLoaded){
        PRODUCTS = Object.values(productsState)
    }

    return (
        <div>
            {
                PRODUCTS && PRODUCTS.map((product) => (
                    <div key={product.id} product={product}>
                            <div>{product.title}</div>
                            <div>{product.description}</div>
                            <Link to={`/products/${product.id}`} ><img src={product.imageURL} alt='img' /></Link>
                    </div>
                ))
            }
        </div>

    )

}

export default ProductsList
