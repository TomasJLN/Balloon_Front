import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useCategories2 } from '../../../hooks/useCategories2';
import { useLocations } from '../../../hooks/useLocations';
import './filter.css';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';
import '../searchBar.css';
import React, { useRef } from 'react';

const Filter = () => {
  const datePickerRef = useRef();
  const categories = useCategories2();
  const locations = useLocations();
  const navigate = useNavigate();
  const location = useLocation();
  let { experience } = queryString.parse(location.search);
  experience = experience ? experience : '';
  const [searchCat, setSearchCat] = useState('');
  const [searchLoc, setSearchLoc] = useState('');
  const [searchStartPrice, setSearchStartPrice] = useState('');
  const [searchEndPrice, setSearchEndPrice] = useState('');

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let query = `/allFilter?experience=${experience}`;
    query += searchStartPrice ? `&start_price=${searchStartPrice}` : '';
    query += searchEndPrice ? `&end_price=${searchEndPrice}` : '';
    query += searchCat ? `&category=${searchCat}` : '';
    query += searchLoc ? `&location=${searchLoc}` : '';

    navigate(query);
  }, [searchCat, searchLoc, searchStartPrice, searchEndPrice]);

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
            </div>
            <div className="location-filter">
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
            </div>
            <div className="price-filter">
              <div className="start-price">
                {searchStartPrice == 0 ? (
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
                {searchEndPrice == 0 ? (
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
