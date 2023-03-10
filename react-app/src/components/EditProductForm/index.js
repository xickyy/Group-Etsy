import "./EditProductForm.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProductsThunk } from "../../store/products";
import { editProductThunk } from "../../store/products";
import { useModal } from "../../context/Modal";

const EditProductForm = ({ product }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const productId = product.id;
 
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [imageURL, setImageURL] = useState(product.imageURL);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

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
      imageURL,
    };

    const editedProduct = await dispatch(editProductThunk(payload))
    if (!editedProduct.id) {
      setErrors(editedProduct);
    } else {
      closeModal()
    }
  };

  return sessionUser.id ? (
    <section>
      <form onSubmit={handleSubmit}>
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
          required
        />

        <input
          type="text"
          placeholder="Product description here"
          value={description}
          onChange={updateDescription}
          required
        />

        <input
          type="number"
          min="0"
          placeholder="Price here"
          value={price || ""}
          onChange={updatePrice}
          required
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
};

export default EditProductForm;
