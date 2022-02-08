import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import './searchBar.css';
import Filter from './filter/Filter';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  console.log(navigate);

  let { experience } = queryString.parse(location.search);

  console.log(experience);

  const [toSearch, setToSearch] = useState(experience ? experience : '');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') resetInput();
  }, [location.pathname]);

  /* const handleChange = (e) => {
    navigate(`/allFilter?experience=${toSearch}`);
    setSubmitted(true);
  }; */

  const handleSubmit = (e) => {
    setSubmitted(true);
    navigate(`/allFilter?experience=${toSearch}`);
    e.preventDefault();
  };

  const resetInput = () => {
    setToSearch('');
    setSubmitted(false);
  };
  console.log('to search =>', toSearch);
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
        <div className="filter">{submitted && <Filter />}</div>
      </div>
    </>
  );
};

export default SearchBar;
