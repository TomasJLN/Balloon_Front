import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useCategories2 } from '../../../hooks/useCategories2';
import { useLocations } from '../../../hooks/useLocations';
import DateSearch from '../datesearch/DateSearch';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';
import '../searchBar.css';

const Filter = () => {
  const categories = useCategories2();
  const locations = useLocations();
  const navigate = useNavigate();
  const location = useLocation();
  let { experience } = queryString.parse(location.search);
  experience = experience ? experience : '';
  const [searchCat, setSearchCat] = useState('');
  const [searchLoc, setSearchLoc] = useState('');
  const [searchPrice, setSearchPrice] = useState(100);

  console.log(experience);

  const trySubmit = (e) => {
    setSearchCat(e.target.value);
    console.log('target', e.target.value);

    setTimeout(() => {
      const handleSubmit = (e) => {
        let query = `/allFilter?experience=${experience}`;
        query += searchPrice ? `&end_price=${searchPrice}` : '';
        query += searchCat ? `&category=${searchCat}` : '';
        query += searchLoc ? `&location=${searchLoc}` : '';

        console.log('query', query);
        navigate(query);
      };

      handleSubmit();
    }, 1000);
  };

  const deleteSearch = (e) => {
    navigate(`/`);
  };

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
          pricefilter: '',
          rate: '',
        }}
        onChange={setSearchCat}
      >
        {({ values }) => (
          <Form
            className="Filter"
            style={{
              display: 'flex',

              position: 'relative',
              zIndex: '1',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <div
              className="category-filter"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 15px',
                justifyContent: 'center',
                marginLeft: '1rem',
              }}
            >
              <p>Categoría:</p>
              <Field
                value={searchCat}
                onChange={trySubmit}
                name="categoryfilter"
                as="select"
              >
                <option value="">Selecciona una opción</option>
                {categories.map((cat) => (
                  <option key={cat.id} cat={cat}>
                    {cat.title}
                  </option>
                ))}
              </Field>
            </div>
            <div
              className="location-filter"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 15px',
                justifyContent: 'center',
                marginLeft: '1rem',
              }}
            >
              <p>Localización:</p>
              <Field
                value={searchLoc}
                onChange={(e) => {
                  setSearchLoc(e.target.value);
                  console.log(searchLoc);
                }}
                name="locationfilter"
                as="select"
              >
                <option value="">Selecciona una opción</option>
                {filteredLocations.map((loc, index) => (
                  <option key={index}>{loc.location}</option>
                ))}
              </Field>
            </div>
            <div
              className="price-filter"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 15px',
                justifyContent: 'center',
                marginLeft: '1rem',
              }}
            >
              <p>Precio:</p>
              <Field
                value={searchPrice}
                onChange={(e) => {
                  setSearchPrice(e.target.value);
                  console.log(searchPrice);
                }}
                name="pricefilter"
                type="range"
                start="50"
                min="50"
                max="800"
                step="150"
              />
              <div>Hasta {searchPrice}€</div>
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
            <div
              className="datefilter"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 15px',
                justifyContent: 'center',
                marginLeft: '1rem',
              }}
            >
              <DateSearch />
            </div>
            <div className="buttonfilter">
              <button
                className="enviar"
                type="submit"
                style={{
                  borderRadius: '30px',
                  cursor: 'pointer',
                  height: '3rem',
                  width: '5rem',
                  border: '2px solid slategray',
                }}
              >
                filtrar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Filter;
