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
      <div>
        {sessionUser && sessionUser.id ? (
          <div className="products-list-yellow">
            <h2 className="products-list-title">
              Welcome back,{" "}
              {
                <Link id="products-list-link" to={`/user_details`}>
                  {sessionUser.firstName}
                </Link>
              }
              !
            </h2>
          </div>
        ) : (
          <div className="products-list-blue">
          <h2 className="products-list-title">
            Incredible style and decor, plus one-of-a-kind gifts right this way!
          </h2>
          </div>
        )}
      </div>
      <div className="products-list-grid">
        {PRODUCTS &&
          PRODUCTS.map((product) => (
            <div
              className="products-list-products"
              key={product.id}
              product={product}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  className="products-list-image"
                  src={product.imageURL || "http://www.rcdrilling.com/wp-content/uploads/2013/12/default_image_01-1024x1024-570x760.png"}
                  alt="img"
                />
              </Link>
              {/* <div className="">{product.title}</div> */}
              {/* <div>Stars {product.stars}/5</div> */}
              <div className="products-list-price">${product.price}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductsList;
