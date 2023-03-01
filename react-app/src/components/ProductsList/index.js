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
    console.log("productsState####", productsState)

    let PRODUCTS 
    if(isLoaded){
        console.log("Entering is Loaded")
        PRODUCTS = Object.values(productsState)
        console.log("PRODUCTS",PRODUCTS)
    }

    return (
        <div>
            {
                PRODUCTS && PRODUCTS.map((product) => (
                    <div>
                        <div>{product.title}</div>
                        <div>{product.description}</div>
                        <Link to={`/products/${product.id}`} ><img src={product.imageURL} /></Link>
                    </div>
                ))
            }
        </div>

    )

}

export default ProductsList