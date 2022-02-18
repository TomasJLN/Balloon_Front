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

const DateSearch = () => {
  const datePickerRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  let { experience } = queryString.parse(location.search);
  experience = experience ? experience : '';

  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    let query = `/allFilter?experience=${experience}`;

    query += searchDate ? `&startDate=${searchDate[0]}` : '';
    query += searchDate ? `&endDate=${searchDate[1]}` : '';
    navigate(query);
  }, [searchDate, setSearchDate]);

  return (
    <>
      {' '}
      <form
        onChange={console.log('changinggggg', searchDate[0], searchDate[1])}
      >
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
          range
          inputClass="custom-input"
          ref={datePickerRef}
        />

        <VscCalendar
          className="calendar-button"
          onClick={() => datePickerRef.current.openCalendar()}
        />
      </form>
    </>
  );
};

export default DateSearch;
