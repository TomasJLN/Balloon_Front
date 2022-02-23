import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useCategories2 } from '../../../hooks/useCategories2';
import { useLocations } from '../../../hooks/useLocations';
import './filter.css';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';
import '../searchBar.css';
import React, { useRef } from 'react';
import { Rating } from 'react-simple-star-rating';

const Filter = (props) => {
  const datePickerRef = useRef();
  const categories = useCategories2();
  const locations = useLocations();
  const navigate = useNavigate();
  const location = useLocation();

  

  let { experience } = queryString.parse(location.search);
  experience = experience ? experience : '';
  const [rating, setRating] = useState('');
  


  useEffect(() => {
    let query = `/allFilter?experience=${experience}`;
    query += props.searchStartPrice
      ? `&start_price=${props.searchStartPrice}`
      : '';
    query += props.searchEndPrice ? `&end_price=${props.searchEndPrice}` : '';
    query += props.searchCat ? `&category=${props.searchCat}` : '';
    query += props.searchLoc ? `&location=${props.searchLoc}` : '';
    query += props.searchDate ? `&start=${props.searchDate[0]}` : '';
    query += props.searchDate.length > 1 ? `&end=${props.searchDate[1]}` : '';
    query += rating ? `&review?searchByExp=${rating}` : '';

    navigate(query);
    console.log('new rating', rating);

  }, [
    props.searchCat,
    props.searchLoc,
    props.searchStartPrice,
    props.searchEndPrice,
    experience,
    props.searchDate,
    rating
  ]);

  let filteredLocations = locations.filter(
    (ele, ind) =>
      ind === locations.findIndex((elem) => elem.location === ele.location)
  );

  return (
    <div>
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
          <div className="Filter">
            <div className="category-filter">
              <Field
                className="select"
                value={props.searchCat}
                onChange={(e) => {
                  props.setSearchCat(e.target.value);
                  console.log(props.searchCat);
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
            </div>
            <div className="location-filter">
              <Field
                className="select"
                value={props.searchLoc}
                onChange={(e) => {
                  props.setSearchLoc(e.target.value);
                  console.log(props.searchLoc);
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
            </div>
            <div className="price-filter">
              <div className="start-price">
                {props.searchStartPrice === 0 ? (
                  <p>Precio mínimo</p>
                ) : (
                  `Desde ${props.searchStartPrice} €`
                )}
                <Field
                  className="slider"
                  value={props.searchStartPrice}
                  onChange={(e) => {
                    props.setSearchStartPrice(e.target.value);
                    console.log(props.searchStartPrice);
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
                {props.searchEndPrice === 0 ? (
                  <p>Precio máximo</p>
                ) : (
                  `Hasta ${props.searchEndPrice} €`
                )}
                <Field
                  className="slider"
                  value={props.searchEndPrice}
                  onChange={(e) => {
                    props.setSearchEndPrice(e.target.value);
                    console.log(props.searchEndPrice);
                  }}
                  name="endpricefilter"
                  type="range"
                  start={0}
                  min={0}
                  max={1000}
                  step={50}
                />
              </div>
            </div>
            <div className='rate-filter'>
              <p>Por valoración:</p>
            <Rating fillColor='black' tooltipDefaultText='Por puntos' onClick={setRating} ratingValue={rating} />
            </div>
            
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Filter;
