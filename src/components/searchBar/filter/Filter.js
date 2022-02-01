import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useCategories2 } from '../../../hooks/useCategories2';
import { useLocation } from '../../../hooks/useLocation';
import DateSearch from '../datesearch/DateSearch';

import PriceSlider from './PriceSlider';

const Filter = () => {
  const categories = useCategories2();
  const locations = useLocation();
  const [value, setValue] = useState('');

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
          pricefilter: value,
        }}
        onSubmit={async (values) => {
          const response = await fetch(
            `http://localhost:4000/allFilter?category=${values.categoryfilter}&location=${values.locationfilter}`
          );
          const data = await response.json();
          console.log(data.data);
        }}

        /*  ValidationSchema={ContactFormSchema} */
      >
        {({ errors, touched, validateField, validateForm }) => (
          <Form
            className="Filter"
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '10px 15px',
              Width: '390px',
            }}
          >
            <div
              className="category-filter"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 15px',
              }}
            >
              <p>Por categoría:</p>
              <Field name="categoryfilter" as="select">
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
              }}
            >
              <p>Por Localización:</p>
              <Field name="locationfilter" as="select">
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
              }}
            >
              <p>Por Precio:</p>
              <PriceSlider name="pricefilter" />
            </div>
            <div className="datefilter">
              <DateSearch />
            </div>
            <button
              className="button enviar"
              type="submit"
              style={{ padding: '10px 2px' }}
            >
              filtro
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Filter;
