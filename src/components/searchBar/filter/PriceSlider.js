import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';

export default function PriceSlider() {
  const [value, onChange] = useState(1);
  useEffect(() => {
    const ele = document.querySelector('.buble');
    if (ele) {
      ele.style.left = `${Number(value / 4)}px`;
    }
  });

  return (
    <div className="slider-parent">
      <Formik>
        {({ errors, touched, validateField, validateForm }) => (
          <Form>
            <Field
              name="range"
              type="range"
              min="50"
              max="800"
              step="150"
              value={value}
              onChange={({ target: { value: radius } }) => {
                onChange(radius);
              }}
            />
          </Form>
        )}
      </Formik>
      <div>Hasta {value}€</div>
    </div>
  );
}
