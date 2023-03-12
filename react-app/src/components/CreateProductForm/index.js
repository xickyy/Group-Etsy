import "./CreateProductForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProductsThunk } from "../../store/products";
import { makeProductThunk } from "../../store/products";
import { useHistory } from "react-router-dom";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

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

  let createdProduct;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      price,
      imageURL,
    };

    createdProduct = await dispatch(makeProductThunk(payload))
    if (createdProduct && createdProduct.id) {
      history.push(`/products/${createdProduct.id}`)
    } else {
      setErrors(createdProduct);
    }

  };


  const errorHandle = () => {
    if (errors.length > 0) {
      return (
        <div className='createProduct-errors-container'>
          {errors.map((error, index) => (
            <li className='createProduct-errors' key={index}>Error occurred - {error} </li>
          ))}
        </div>

      )
    }
  }


  return sessionUser.id ? (
    <section>
      <form onSubmit={handleSubmit}>
        {errorHandle()}
        <div>
          <h2>Listing details</h2>
          <p>Tell the world all about your item and why they'll love it.</p>
        </div>

        <div className='createProduct-field'>
          <div className='createProduct-keys'>
            <h4>Title*</h4>
            <p>Include keywords that buyers would use to search for your item.</p>
          </div>
          <input
            className='createProduct-input'
            type="text"
            placeholder="Product title here"
            value={title}
            onChange={updateTitle}
          />
        </div>

        <div className='createProduct-field'>
        <div className='createProduct-keys'>
            <h4>Description*</h4>
            <p>Start with a brief overview that describes your items finest features.</p>
          </div>
          <textarea
            className='createProduct-input-description'
            type="text"
            placeholder="Product description here"
            value={description}
            onChange={updateDescription}
          />
        </div>

        <div className='createProduct-field'>
        <div className='createProduct-keys'>
            <h4>Price*</h4>
            <p>Provide a fair and reasonable price for your product.</p>
          </div>
          <input
            className='createProduct-input'
            type="decimal"
            min="0"
            placeholder="Price here"
            value={price || ""}
            onChange={updatePrice}
          />
        </div>

        <div className='createProduct-field'>
        <div className='createProduct-keys'>
            <h4>Image URL</h4>
            <p>Although not required, it is recommended to provide an image for your product so buyers see exactly what they are getting.</p>
          </div>
          <input
            className='createProduct-input'
            type="text"
            placeholder="Image url here"
            value={imageURL}
            onChange={updateImageURL}
          />
        </div>

        <div className='createProduct-save-container'>
          <button className='createProduct-save' type="submit">Save</button>
        </div>
      </form>
    </section>
  ) : null;
};

export default CreateProductForm;
