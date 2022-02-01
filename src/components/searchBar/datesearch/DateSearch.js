import DatePicker, { DateObject } from 'react-multi-date-picker';
import Footer from 'react-multi-date-picker/plugins/range_picker_footer';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { useState } from 'react';
import './DateSearch.css';

const DateSearch = () => {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

  const [date, setDate] = useState([
    new DateObject().subtract(0, 'days'),
    new DateObject().add(1, 'days'),
  ]);
  console.log('date', date);
  return (
    <div className="DateSearch">
      <p>Rango de fechas:</p>
      <DatePicker
        className="rmdp-mobile"
        value={date}
        onChange={setDate}
        range
        numberOfMonths={1}
        names={{
          selectedDates: 'Info reservas',
          from: 'Fecha inicial:',
          to: 'Fecha fin',
          selectDate: 'Seleccionar',
          close: 'Cerrar',
          separator: ',',
        }}
        months={months}
        weekDays={days}
      />
    </div>
  );
};

export default DateSearch;
