import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useCategories2 } from '../../../hooks/useCategories2';
import { useLocations } from '../../../hooks/useLocations';
import './filter.css';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';
import '../searchBar.css';
import React, { useRef } from 'react';

const Filter = (props) => {
  const datePickerRef = useRef();
  const categories = useCategories2();
  const locations = useLocations();
  const navigate = useNavigate();
  const location = useLocation();
  let { experience } = queryString.parse(location.search);
  experience = experience ? experience : '';
 


  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let query = `/allFilter?experience=${experience}`;
    query += props.searchStartPrice ? `&start_price=${props.searchStartPrice}` : '';
    query += props.searchEndPrice ? `&end_price=${props.searchEndPrice}` : '';
    query += props.searchCat ? `&category=${props.searchCat}` : '';
    query += props.searchLoc ? `&location=${props.searchLoc }` : '';
    query += props.searchDate ? `&start=${props.searchDate[0]}` : '';
    query += props.searchDate ? `&end=${props.searchDate[1]}` : '';

   navigate(query)

    
  }, [props.searchCat, props.searchLoc , props.searchStartPrice, props.searchEndPrice, navigate, experience]);



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
          <Form className="Filter">
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
                value={props.searchLoc }
                onChange={(e) => {
                  props.setSearchLoc(e.target.value);
                  console.log(props.searchLoc );
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
            {/* <div
              className="rate-filter"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 15px',
                justifyContent: 'center',
                marginLeft: '1rem',
              }}
            >
              <p>Valoración:</p>
              <label>
                <Field type="radio" name="rate" value="1estrella" />★
              </label>
              <label>
                <Field type="radio" name="rate" value="3estrellas" />
                ★★★
              </label>
              <label>
                <Field type="radio" name="rate" value="5estrellas" />
                ★★★★★
              </label>
            </div>
            <div>{values.rate}</div> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Filter;
