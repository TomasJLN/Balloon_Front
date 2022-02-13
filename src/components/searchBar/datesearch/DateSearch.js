/*import DatePicker, { DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const DateSearch = () => {
	const [dateValues, setDateValues] = useState([
		new DateObject().format(),
		new DateObject().format(),
	]);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		console.log('query and values', values);
		navigate(
			`&start_date=${values[0].format()}&end_date=${values[1].format()}`
		);
	};

	console.log('Values', values);

	return (
		<div className='DateSearch'>
			<p>Rango de fechas:</p>

			<DatePicker value={values} onChange={{ setValues, handleSubmit }} range />
		</div>
	);
};

export default DateSearch;
*/
