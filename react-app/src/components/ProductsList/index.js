import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { allProductsThunk } from "../../store/products";

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
                PRODUCTS.map((product) => (
                    <div>
                        <div>{product.title}</div>
                        <div>{product.description}</div>
                        <img src={product.imageURL} />
                    </div>
                ))
            }
        </div>

    )

}

export default ProductsList