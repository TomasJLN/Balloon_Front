import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import './searchBar.css';
import Filter from './filter/Filter';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let { experience } = queryString.parse(location.search);

  console.log(experience);

  const [toSearch, setToSearch] = useState(experience ? experience : '');

  useEffect(() => {
    if (location.pathname === '/') resetInput();
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/allFilter?experience=${toSearch}`);
  };

  const resetInput = () => setToSearch('');

  return (
    <>
      <div className="searchBar">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="input-search"
            type="text"
            name="searchText"
            value={toSearch}
            onChange={(e) => {
              setToSearch(e.target.value);
            }}
            autoComplete="off"
            placeholder="Buscar...."
          />
          <button className="search-button" type="submit">
            <FaSearch />
          </button>
        </form>
        <div className="filter">
          <Filter />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
