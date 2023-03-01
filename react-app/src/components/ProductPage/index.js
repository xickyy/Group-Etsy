import "./ProductPage.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allProductsThunk } from "../../store/products";

const ProductPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allProductsThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div>
            Product Page 
        </div>
    )
}

export default ProductPage;