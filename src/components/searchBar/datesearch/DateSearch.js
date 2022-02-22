import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker';
import { VscCalendar } from 'react-icons/vsc';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-multi-date-picker/styles/colors/purple.css';
import opacity from 'react-element-popper/animations/opacity';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Footer from 'react-multi-date-picker/plugins/range_picker_footer';

const SubmitButton = ({ handleDate }) => {
  return (
    <div>
      <button onClick={handleDate}>Buscar fechas</button>
    </div>
  );
};

const DateSearch = () => {
  const datePickerRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  let { experience } = queryString.parse(location.search);
  experience = experience ? experience : '';

  const [searchDate, setSearchDate] = useState('');

  const handleDate = (e) => {
    e.preventDefault();
    let query = `/allFilter?experience=${experience}`;

    query += searchDate ? `&start=${searchDate[0]}` : '';
    query += searchDate ? `&end=${searchDate[1]}` : '';

    navigate(query);
    query = '';
  };

  return (
    <>
      <div>
        {/*<FaCalendarAlt
									style={{
										color: 'black',
										fontSize: '24px',
										marginRight: '5px',
									}}
								/>*/}
        <DatePicker
          value={searchDate}
          onChange={setSearchDate}
          onSubmit={handleDate}
          range
          inputClass="custom-input"
          ref={datePickerRef}
          plugins={[<SubmitButton handleDate={handleDate} position="bottom" />]}
        />

        <VscCalendar
          className="calendar-button"
          onClick={() => datePickerRef.current.openCalendar()}
        />
      </div>
    </>
  );
};

export default DateSearch;
