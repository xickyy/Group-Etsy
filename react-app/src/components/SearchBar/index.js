import './SearchBar.css'

import React, { useState, useEffect } from 'react'

const SearchBar = ({ placeholder, data }) => {

  const [allProducts, setAllProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setAllProducts(data.products);
    }
    getProducts()
  }, []);

  const handleFilter = (e) => {
    const searchWord = e.target.value
    const newFilter = allProducts.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase())
    });
    if (searchWord === '') {
      setFilterData([])
      setSearch('')
    } else {
      setFilterData(newFilter);
      setSearch(searchWord)
    }
  }

  const clearSearch = () => {
    setFilterData([]);
    setSearch('')
  }

  return (
    <div className="search" id='link'>
      <div className='searchInputs'>
        <input type='text' placeholder={placeholder} value={search} onChange={handleFilter} />
        <div className='searchIcon'>
          {search.length === 0 ? <i className="fa-solid fa-magnifying-glass"></i> : <i className="fa-solid fa-xmark" id='clearBtn' onClick={clearSearch}></i>}

        </div>
      </div>
      {filterData.length !== 0 && (
        <div className='dataResult'>
          {filterData.slice(0, 15).map((value, key) => {
            return <a className='dataItem' key={value.id} href={`/products/${value.id}`}>
              <p>{value.title}</p>
            </a>
          })}
        </div>
      )}
    </div>
  )
}


export default SearchBar
