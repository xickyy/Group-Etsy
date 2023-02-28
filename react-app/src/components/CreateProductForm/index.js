import "./CreateProductForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { allProductsThunk } from "../../store/products";
import { makeProductThunk } from "../../store/products";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [errors, setErrors] = useState([]);

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
      title,
      description,
      price,
      imageURL,
    };

    let createdProduct = await dispatch(makeProductThunk(payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    if (createdProduct) {
        history.push(`/products/${createdProduct.id}`)
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
            <p>Create a Product:</p>

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
                <button type="submit-button">Create New Product</button>
            </div>
        </form>
    </section>
) : null;
}

export default CreateProductForm;