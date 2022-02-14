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
	const [searchDate2, setSearchDate2] = useState('');

	useEffect(() => {
		let query = `/allFilter?experience=${experience}`;

		query += searchDate ? `&startDate=${searchDate[0]}` : '';
		query += searchDate2 ? `&endDate=${searchDate2[1]}` : '';
		navigate(query);
	}, [searchDate, searchDate2]);

	return (
		<div className='datefilter'>
			<div className='DateSearch'>
				{/*<FaCalendarAlt
									style={{
										color: 'black',
										fontSize: '24px',
										marginRight: '5px',
									}}
								/>*/}
				<DatePicker
					className='date purple'
					value={searchDate}
					onChange={setSearchDate}
					range
					minDate={4}
					maxDate={0}
					hideOnScroll
					inputClass='custom-input'
					animations={[opacity()]}
					ref={datePickerRef}
				/>
				<div>
					<button onClick={() => datePickerRef.current.openCalendar()}>
						<VscCalendar />
					</button>
				</div>
			</div>
		</div>
	);
};

export default DateSearch;
