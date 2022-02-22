import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { VscCalendar } from 'react-icons/vsc';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import './searchBar.css';
import Filter from './filter/Filter';
import DateSearch from './datesearch/DateSearch';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dateSubmit, setDateSubmit] = useState(false);

  const handleDate = (e) => {
    e.preventDefault();
    setDateSubmit(false);
    console.log('BUTTON DATE!!!');
  };

  let { experience } = queryString.parse(location.search);
  const [searchCat, setSearchCat] = useState('');
  const [searchLoc, setSearchLoc] = useState('');
  const [searchStartPrice, setSearchStartPrice] = useState('');
  const [searchEndPrice, setSearchEndPrice] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const [toSearch, setToSearch] = useState(experience ? experience : '');

  useEffect(() => {
    if (location.pathname === '/') resetInput();
  }, [location.pathname]);

  /* const handleChange = (e) => {
    navigate(`/allFilter?experience=${toSearch}`);
    setSubmitted(true);
  }; */

  const handleSubmit = (e) => {
    toSearch && navigate(`/allFilter?experience=${toSearch}`);
    e.preventDefault();
  };

  const resetInput = () => {
    setToSearch('');
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
          <div className="calendar-button">
            <DateSearch
              handleDate={handleDate}
              searchDate={searchDate}
              setSearchDate={setSearchDate}
              searchStartPrice={searchStartPrice}
              setSearchStartPrice={setSearchStartPrice}
              searchEndPrice={searchEndPrice}
              setSearchEndPrice={setSearchEndPrice}
              searchLoc={searchLoc}
              setSearchLoc={setSearchLoc}
              searchCat={searchCat}
              setSearchCat={setSearchCat}
            />
          </div>
        </form>
      </div>
      <div className="filter">
        <Filter
          handleDate={handleDate}
          searchDate={searchDate}
          setSearchDate={setSearchDate}
          searchStartPrice={searchStartPrice}
          setSearchStartPrice={setSearchStartPrice}
          searchEndPrice={searchEndPrice}
          setSearchEndPrice={setSearchEndPrice}
          searchLoc={searchLoc}
          setSearchLoc={setSearchLoc}
          searchCat={searchCat}
          setSearchCat={setSearchCat}
          prueba="prueba"
        />
      </div>
    </>
  );
};

export default SearchBar;
