import { Formik, Form, Field, setNestedObjectValues } from 'formik';
import { useState, useEffect } from 'react';
import { useCategories2 } from '../../../hooks/useCategories2';
import { useLocation } from '../../../hooks/useLocation';

import DateSearch from '../datesearch/DateSearch';

const Filter = () => {
  const categories = useCategories2();
  const locations = useLocation();
  const [value, setValue] = useState();

  let filteredLocations = locations.filter(
    (ele, ind) =>
      ind === locations.findIndex((elem) => elem.location === ele.location)
  );

  useEffect(() => {
    const ele = document.querySelector('.buble');
    if (ele) {
      ele.style.left = `${Number(value / 2)}px`;
    }
  });

  return (
    <div>
      <Formik
        initialValues={{
          categoryfilter: '',
          locationfilter: '',
          pricefilter: '',
        }}
        onSubmit={async (values) => {
          const response = await fetch(
            `http://localhost:4000/allFilter?end_price=${values.pricefilter}&category=${values.categoryfilter}&location=${values.locationfilter}`
          );
          const data = await response.json();
          console.log(values.pricefilter, values, data.data);
        }}

        /*  ValidationSchema={ContactFormSchema} */
      >
        {({ errors, touched, validateField, validateForm }) => (
          <Form
            className="Filter"
            style={{
              display: 'flex',
              justifyContent: 'center',
              Width: '390px',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              backgroundColor: 'black',
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
              <Field name="categoryfilter" as="select">
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
              <Field name="locationfilter" as="select">
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
                name="pricefilter"
                type="range"
                min="50"
                max="800"
                step="150"
              />
              <div>Hasta {value}€</div>
            </div>
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
