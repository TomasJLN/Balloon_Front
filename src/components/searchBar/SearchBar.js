import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './searchBar.css';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="searchBar">
      <form className="search-form" onSubmit={() => {}}>
        <input
          className="input-search"
          type="text"
          onClick={() => {}}
          placeholder="Buscar...."
        />
        <button className="search-button">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
