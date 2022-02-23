import DatePicker from 'react-multi-date-picker';
import { VscCalendar } from 'react-icons/vsc';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import 'react-multi-date-picker/styles/colors/purple.css';
import React, { useRef } from 'react';


const DateSearch = (props) => {
  const datePickerRef = useRef();
  





  return (
    <>
      <div>
       
        <DatePicker
          value={props.searchDate}
          onChange={props.setSearchDate}
          range
          inputClass="custom-input"
          ref={datePickerRef}
          
          
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
