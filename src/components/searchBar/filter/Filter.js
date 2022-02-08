import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useCategories2 } from '../../../hooks/useCategories2';
import { useLocations } from '../../../hooks/useLocations';

import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';
import '../searchBar.css';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';

const Filter = () => {
	const categories = useCategories2();
	const locations = useLocations();
	const navigate = useNavigate();
	const location = useLocation();
	let { experience } = queryString.parse(location.search);
	experience = experience ? experience : '';
	const [searchCat, setSearchCat] = useState('');
	const [searchLoc, setSearchLoc] = useState('');
	const [searchStartPrice, setSearchStartPrice] = useState('0');
	const [searchEndPrice, setSearchEndPrice] = useState('50');
	const [searchDate, setSearchDate] = useState([
		new DateObject(),
		new DateObject(),
	]);

	console.log(experience);

	const handleSubmit = (e) => {
		e.preventDefault();
		let startDate = searchDate[0].format();
		let endDate = searchDate[1].format();
		console.log('startdate:', startDate, 'enddate:', endDate);

		let query = `/allFilter?experience=${experience}`;
		query += searchStartPrice ? `&start_price=${searchStartPrice}` : '';
		query += searchEndPrice ? `&end_price=${searchEndPrice}` : '';
		query += searchCat ? `&category=${searchCat}` : '';
		query += searchLoc ? `&location=${searchLoc}` : '';
		query += startDate ? `&startDate=${startDate}` : '';
		query += endDate ? `&endDate=${endDate}` : '';
		console.log('date values', searchDate);
		navigate(query);
	};

	let filteredLocations = locations.filter(
		(ele, ind) =>
			ind === locations.findIndex((elem) => elem.location === ele.location)
	);

	return (
		<div>
			<Formik
				initialValues={{
					categoryfilter: '',
					locationfilter: '',
					endpricefilter: '',
					startpricefilter: '',
					rate: '',
				}}
			>
				{({ values }) => (
					<Form
						onSubmit={handleSubmit}
						className='Filter'
						style={{
							display: 'flex',

							position: 'relative',
							zIndex: '1',
							justifyContent: 'center',
							alignItems: 'center',
							color: 'white',
						}}
					>
						<div
							className='category-filter'
							style={{
								display: 'flex',
								flexDirection: 'column',
								padding: '10px 15px',
								justifyContent: 'center',
								marginLeft: '1rem',
							}}
						>
							<p>Categoría:</p>
							<Field
								value={searchCat}
								onChange={(e) => {
									setSearchCat(e.target.value);
									console.log(searchCat);
								}}
								name='categoryfilter'
								as='select'
							>
								<option value=''>Selecciona una opción</option>
								{categories.map((cat) => (
									<option key={cat.id} cat={cat}>
										{cat.title}
									</option>
								))}
							</Field>
						</div>
						<div
							className='location-filter'
							style={{
								display: 'flex',
								flexDirection: 'column',
								padding: '10px 15px',
								justifyContent: 'center',
								marginLeft: '1rem',
							}}
						>
							<p>Localización:</p>
							<Field
								value={searchLoc}
								onChange={(e) => {
									setSearchLoc(e.target.value);
									console.log(searchLoc);
								}}
								name='locationfilter'
								as='select'
							>
								<option value=''>Selecciona una opción</option>
								{filteredLocations.map((loc, index) => (
									<option key={index}>{loc.location}</option>
								))}
							</Field>
						</div>
						<div
							className='price-filter'
							style={{
								display: 'flex',
								flexDirection: 'column',
								padding: '10px 15px',
								justifyContent: 'center',
								marginLeft: '1rem',
							}}
						>
							<div>{`Desde: ${searchStartPrice} €`}</div>
							<Field
								value={searchStartPrice}
								onChange={(e) => {
									setSearchStartPrice(e.target.value);
									console.log(searchStartPrice);
								}}
								name='startpricefilter'
								type='range'
								start='0'
								min='0'
								max='1000'
								step='50'
							/>

							<div>{`Hasta ${searchEndPrice} €`}</div>
							<Field
								value={searchEndPrice}
								onChange={(e) => {
									setSearchEndPrice(e.target.value);
									console.log(searchEndPrice);
								}}
								name='endpricefilter'
								type='range'
								start='50'
								min='50'
								max='1000'
								step='50'
							/>
						</div>
						{/* <div
              className="rate-filter"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 15px',
                justifyContent: 'center',
                marginLeft: '1rem',
              }}
            >
              <p>Valoración:</p>
              <label>
                <Field type="radio" name="rate" value="1estrella" />★
              </label>
              <label>
                <Field type="radio" name="rate" value="3estrellas" />
                ★★★
              </label>
              <label>
                <Field type="radio" name="rate" value="5estrellas" />
                ★★★★★
              </label>
            </div>
            <div>{values.rate}</div> */}
						<div
							className='datefilter'
							style={{
								display: 'flex',
								flexDirection: 'column',
								padding: '10px 15px',
								justifyContent: 'center',
								marginLeft: '1rem',
							}}
						>
							<div className='DateSearch'>
								<p>Rango de fechas:</p>

								<DatePicker value={searchDate} onChange={setSearchDate} range />
							</div>
						</div>
						<div className='buttonfilter'>
							<button
								className='enviar'
								type='submit'
								style={{
									borderRadius: '30px',
									cursor: 'pointer',
									height: '3rem',
									width: '5rem',
									border: '2px solid slategray',
								}}
							>
								filtrar
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Filter;
