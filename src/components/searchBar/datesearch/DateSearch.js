import DatePicker from 'react-multi-date-picker';
import { VscCalendar } from 'react-icons/vsc';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import 'react-multi-date-picker/styles/colors/purple.css';
import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';



const DateSearch = (props) => {
  const datePickerRef = useRef();
  
  const navigate = useNavigate();
  const location = useLocation();
  let { experience } = queryString.parse(location.search);

  const handleSubmit = (e) => {
    e.preventDefault()
    let query = `/allFilter?experience=${experience}`;
    query += props.searchStartPrice ? `&start_price=${props.searchStartPrice}` : '';
    query += props.searchEndPrice ? `&end_price=${props.searchEndPrice}` : '';
    query += props.searchCat ? `&category=${props.searchCat}` : '';
    query += props.searchLoc ? `&location=${props.searchLoc }` : '';
    query += props.searchDate ? `&start=${props.searchDate[0]}` : '';
    query += props.searchDate ? `&end=${props.searchDate[1]}` : '';

   navigate(query)
  }
  
  
  const SubmitButton  = ()=> {
    return <div><button onClick={handleSubmit}>Buscar fechas</button></div>;
  } 

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
          onSubmit={handleSubmit}
          plugins={[< SubmitButton position='bottom' / >]}
          
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
