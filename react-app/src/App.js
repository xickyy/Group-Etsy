import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateProductForm from "./components/CreateProductForm";
import ProductsList from "./components/ProductsList";
import ProductPage from './components/ProductPage'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/products">
            <ProductsList />
          </Route>
          <Route exact path="/products/create">
            <CreateProductForm />
          </Route>
          <Route exact path='/products/:productId'>
            <ProductPage />
          </Route>
          {/* <ProtectedRoute><Route path="/cart"></Route></ProtectedRoute> */}
        </Switch>
      )}
    </>
  );
}

export default App;
