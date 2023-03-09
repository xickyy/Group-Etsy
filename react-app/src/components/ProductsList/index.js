import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { allProductsThunk } from "../../store/products";
import { Link } from "react-router-dom";

const ProductsList = (products) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(allProductsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  let productsState = useSelector((state) => state.products);

  let PRODUCTS;
  if (isLoaded) {
    PRODUCTS = Object.values(productsState);
  }

  return (
    <div>
      {sessionUser && sessionUser.id ? (
        <h2>{`Welcome back, ${sessionUser.firstName}`}</h2>
      ) : <h2>Incredible style and decor, plus one-of-a-kind gifts right this way!</h2>}

      {PRODUCTS &&
        PRODUCTS.map((product) => (
          <div key={product.id} product={product}>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageURL} alt="img" />
            </Link>
            <div>{product.title}</div>
            <div>Stars {product.stars}/5</div>
            <div>${product.price}</div>
          </div>
        ))}
    </div>
  );
};

export default ProductsList;
