import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import './searchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let { q } = queryString.parse(location.search);

  const [search, setSearch] = useState(q ? q : '');

  useEffect(() => {
    if (location.pathname === '/') resetInput();
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/allFilter?experience=${search}`);
  };

  const resetInput = () => setSearch('');

  return (
    <div className="searchBar">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="input-search"
          type="text"
          name="searchText"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
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
