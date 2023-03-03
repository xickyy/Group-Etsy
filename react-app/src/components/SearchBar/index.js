import React, {useState, useEffect} from 'react'
import { allProductsThunk } from '../../store/products';
import { useSelector, useDispatch } from "react-redux";


const SearchBar = () => {

  const dispatch = useDispatch();

  const getProducts = async () => {
    const allProducts = await fetch('/api/products');
    console.log('ALLLLLLLLLLLLLLLLLLLL',allProducts)
    const data = await allProducts.json();
    console.log('DATAAAAAAAAAAAAAAAAAAAA', data)
    return data;
  }

  const products = getProducts()



  const [searchInput, setSearchInput] = useState("");
  // const products = ['pillow', 'necklace', 'chair']
  console.log('@@@@@@@@@@@', products)

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
      products.filter((product) => {
      return product.match(searchInput);
  });
  }

  return <div>

<input
   type="search"
   placeholder="Search here"
   onChange={handleChange}
   value={searchInput} />

{/* <table>
  <tr>
    <th>Country</th>
    <th>Continent</th>
  </tr>

{products.map((product, *index*) => {

<div>
  <tr>
    <td>{products}</td>
    <td>{products}</td>
  </tr>
</div>

})}
</table> */}

</div>



}


export default SearchBar;
