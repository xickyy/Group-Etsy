import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { allProductsThunk } from "../../store/products";
import { Link } from "react-router-dom";
import "./ProductsList.css";

const ProductsList = () => {
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
    <>
    <div className="products-list">
      {sessionUser && sessionUser.id ? (
        <div className="products-list-yellow">
        <h2 className="products-list-title">Welcome back, {<Link id="products-list-link" to={`/user_details`}>{sessionUser.firstName}</Link>}!</h2>
        </div>
      ) : <h2 className="products-list-title">Incredible style and decor, plus one-of-a-kind gifts right this way!</h2>}
      </div>
      {PRODUCTS &&
        PRODUCTS.map((product) => (
          <div className="products-list-grid">
          <div className="products-list-products" key={product.id} product={product}>
            <Link to={`/products/${product.id}`}>
              <img className="products-list-image" src={product.imageURL} alt="img" />
            </Link>
            <div className="">{product.title}</div>
            <div>Stars {product.stars}/5</div>
            <div>${product.price}</div>
          </div>
          </div>
        ))}
    </>
  );
};

export default ProductsList;
