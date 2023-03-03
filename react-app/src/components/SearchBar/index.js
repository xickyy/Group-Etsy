
import React, {useState, useEffect} from 'react'
import { allProductsThunk } from '../../store/products';
import { useSelector, useDispatch } from "react-redux";



const SearchBar = () => {

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products);
    }
    getProducts()}, []);


  const [searchInput, setSearchInput] = useState("");
  // const products = ['pillow', 'necklace', 'chair']
  console.log('@@@@@@@@@@@', products)
  

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    products.filter((product) => {
    return product.title.match(searchInput);
});
}

const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase()));

return (
  <div>
    <input
      type="search"
      placeholder="Search here"
      onChange={handleChange}
      value={searchInput}
    />
    <table>
      <thead>
        <tr>
          <th>Product</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product, index) => (
          <tr key={index}>
            <td>{product.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


}


export default SearchBar;
