import { Formik, Form, Field } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { useCategories2 } from '../../../hooks/useCategories2';
import { useLocations } from '../../../hooks/useLocations';
import './filter.css';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';
import '../searchBar.css';
import { FaSearch } from 'react-icons/fa';
import { Rating } from 'react-simple-star-rating';
import DatePicker from 'react-multi-date-picker';
import { VscCalendar } from 'react-icons/vsc';
import 'react-multi-date-picker/styles/layouts/mobile.css';


const Filter = () => {
  const datePickerRef = useRef();
  const categories = useCategories2();
  const locations = useLocations();
  const navigate = useNavigate();
  const location = useLocation();

  

  let { experience } = queryString.parse(location.search);
  experience = experience ? experience : '';

  const [rating, setRating] = useState('');
  const [searchCat, setSearchCat] = useState('');
  const [searchLoc, setSearchLoc] = useState('');
  const [searchStartPrice, setSearchStartPrice] = useState('');
  const [searchEndPrice, setSearchEndPrice] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [toSearch, setToSearch] = useState(experience ? experience : '');
  
  useEffect(() => {
    if (location.pathname === '/') resetInput();
  }, [location.pathname]);

  const resetInput = () => {
    setToSearch('');
  };

  const handleSubmit = (e) => {
    toSearch && navigate(`/allFilter?experience=${toSearch}`);
    e.preventDefault();
    
  };


  useEffect(() => {
    let query = `/allFilter?experience=${experience}`;
    query += searchStartPrice
      ? `&start_price=${searchStartPrice}`
      : '';
    query += searchEndPrice ? `&end_price=${searchEndPrice}` : '';
    query += searchCat ? `&category=${searchCat}` : '';
    query += searchLoc ? `&location=${searchLoc}` : '';
    query += searchDate ? `&start=${searchDate[0]}` : '';
    query += searchDate.length > 1 ? `&end=${searchDate[1]}` : '';
    query += rating ? `&review?searchByExp=${rating}` : '';
    toSearch && navigate(`/allFilter?experience=${toSearch}`);

    navigate(query);
    console.log('new rating', rating);

  }, [
    searchCat,
    searchLoc,
    searchStartPrice,
    searchEndPrice,
    experience,
    searchDate,
    rating
  ]);

  let filteredLocations = locations.filter(
    (ele, ind) =>
      ind === locations.findIndex((elem) => elem.location === ele.location)
  );

  return ( <>
    
      <Formik
        initialValues={{
          categoryfilter: '',
          locationfilter: '',
          endpricefilter: '',
          startpricefilter: '',
          rate: '',
        }}
      >
        {({ values }) => (
          <Form onSubmit={handleSubmit}>
            <div className='searchBar'>
            
            <Field
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
          <DatePicker
         value={searchDate}
         onChange={setSearchDate}
         range
         inputClass="custom-input"
         ref={datePickerRef}
         
         
       />

       <VscCalendar
         className="calendar-button"
         onClick={() => datePickerRef.current.openCalendar()}
       />
          </div>
       
      
      
       <div>
     </div>
            <div style={{display:'flex'}}>
              <Field
                className="select"
                value={searchCat}
                onChange={(e) => {
                  setSearchCat(e.target.value);
                  console.log(searchCat);
                }}
                name="categoryfilter"
                as="select"
              >
                <option className="option" value="">
                  Categoría
                </option>
                {categories.map((cat) => (
                  <option className="option" key={cat.id} cat={cat}>
                    {cat.title}
                  </option>
                ))}
              </Field>
            
           
              <Field
                className="select"
                value={searchLoc}
                onChange={(e) => {
                  setSearchLoc(e.target.value);
                  console.log(searchLoc);
                }}
                name="locationfilter"
                as="select"
              >
                <option className="option" value="">
                  Localización
                </option>
                {filteredLocations.map((loc, index) => (
                  <option className="option" key={index}>
                    {loc.location}
                  </option>
                ))}
              </Field>
           
            
              <div className="start-price">
                {searchStartPrice === 0 ? (
                  <p>Precio mínimo</p>
                ) : (
                  `Desde ${searchStartPrice} €`
                )}
                <Field
                  className="slider"
                  value={searchStartPrice}
                  onChange={(e) => {
                    setSearchStartPrice(e.target.value);
                    console.log(searchStartPrice);
                  }}
                  name="startpricefilter"
                  type="range"
                  start={0}
                  min={0}
                  max={1000}
                  step={50}
                />
              </div>

              <div className="end-price">
                {searchEndPrice === 0 ? (
                  <p>Precio máximo</p>
                ) : (
                  `Hasta ${searchEndPrice} €`
                )}
                <Field
                  className="slider"
                  value={searchEndPrice}
                  onChange={(e) => {
                    setSearchEndPrice(e.target.value);
                    console.log(searchEndPrice);
                  }}
                  name="endpricefilter"
                  type="range"
                  start={0}
                  min={0}
                  max={1000}
                  step={50}
                />
              </div>
           
            
              <p>Por valoración:</p>
            <Rating fillColor='black' tooltipDefaultText='Por puntos' onClick={setRating} ratingValue={rating} />
            </div>
            
          </Form>
        )}
        
      </Formik>
    
    </>
  );
};

export default Filter;
