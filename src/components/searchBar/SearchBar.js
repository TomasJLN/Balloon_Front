import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import './searchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('mostramos el location ', location);
  const { q } = queryString.parse(location.search);

  // console.log('El inicio del valor ', experience);

  const [search, setSearch] = useState({ experience: q });

  // console.log(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(q);
    navigate(`/allFilter?experience=${search.experience}`);
  };

  return (
    <div className="searchBar">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="input-search"
          type="text"
          value={search.experience}
          name="searchText"
          onChange={(e) => {
            setSearch({ experience: e.target.value });
          }}
          autoComplete="off"
          placeholder="Buscar...."
        />
        <button className="search-button" type="submit">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
