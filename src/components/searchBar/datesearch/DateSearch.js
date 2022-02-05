import DatePicker, { DateObject } from 'react-multi-date-picker';
import Footer from 'react-multi-date-picker/plugins/range_picker_footer';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { useState } from 'react';

const DateSearch = () => {
  const [values, setValues] = useState([
    new DateObject().format(),
    new DateObject().format(),
  ]);

  console.log('Values', values);

  return (
    <div className="DateSearch">
      <p>Rango de fechas:</p>

      <DatePicker value={values} onChange={setValues} range />
    </div>
  );
};

export default DateSearch;
