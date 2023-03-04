import "./EditProductForm.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { allProductsThunk } from "../../store/products";
import { editProductThunk } from "../../store/products";

const EditProductForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const { productId } = useParams();
    const productToChange = useSelector((state) => state.products[productId]);
  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [imageURL, setImageURL] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (productToChange) {
          setTitle(productToChange.title);
          setDescription(productToChange.description);
          setPrice(productToChange.price);
          setImageURL(productToChange.imageURL);
        }
      }, [productToChange]);
  
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateImageURL = (e) => setImageURL(e.target.value);
  
    useEffect(() => {
      dispatch(allProductsThunk());
    }, [dispatch]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const payload = {
        productId,
        title,
        description,
        price,
        imageURL
      };
  
      let editedProduct = await dispatch(editProductThunk(payload)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
      
      if (editedProduct) {
          history.push(`/products/${editedProduct.id}`)
      }
    };
  
    return sessionUser.id ? (
      <section>
          <form className="create-product-form" onSubmit={handleSubmit}>
              <div className="errors">
                  {errors.map((error, index) => (
                      <li key={index}>Error: {error}</li>
                  ))}
              </div>
              <p>Edit Product:</p>
  
              <input 
              type="text"
              placeholder="Product title here"
              value={title}
              onChange={updateTitle}
              />
  
              <input 
              type="text"
              placeholder="Product description here"
              value={description}
              onChange={updateDescription}
              />
  
              <input 
              type="number"
              min="0"
              placeholder="Price here"
              value={price || ""}
              onChange={updatePrice}
              />
  
              <input 
              type="text"
              placeholder="Image url here"
              value={imageURL}
              onChange={updateImageURL}
              />
  
              <div>
                  <button type="submit">Edit Product</button>
              </div>
          </form>
      </section>
  ) : null;
  }
  
  export default EditProductForm;