import DatePicker from 'react-multi-date-picker';
import { VscCalendar } from 'react-icons/vsc';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import 'react-multi-date-picker/styles/colors/purple.css';
import React, { useRef } from 'react';




const DateSearch = (props) => {
  const datePickerRef = useRef();

  


  return (
    <>
      
      <form
        
      >
        {/*<FaCalendarAlt
									style={{
										color: 'black',
										fontSize: '24px',
										marginRight: '5px',
									}}
								/>*/}
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
      </form>
      
    </>
  );
};

export default DateSearch;
