import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useCategories2 } from '../../../hooks/useCategories2';
import { useLocations } from '../../../hooks/useLocations';
import './filter.css';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';
import '../searchBar.css';
import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-multi-date-picker/styles/colors/purple.css';
import opacity from 'react-element-popper/animations/opacity';

const Filter = () => {
	const categories = useCategories2();
	const locations = useLocations();
	const navigate = useNavigate();
	const location = useLocation();
	let { experience } = queryString.parse(location.search);
	experience = experience ? experience : '';
	const [searchCat, setSearchCat] = useState('');
	const [searchLoc, setSearchLoc] = useState('');
	const [searchStartPrice, setSearchStartPrice] = useState('');
	const [searchEndPrice, setSearchEndPrice] = useState('');
	const [searchDate, setSearchDate] = useState('');
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	useEffect(() => {
		let query = `/allFilter?experience=${experience}`;
		query += searchStartPrice ? `&start_price=${searchStartPrice}` : '';
		query += searchEndPrice ? `&end_price=${searchEndPrice}` : '';
		query += searchCat ? `&category=${searchCat}` : '';
		query += searchLoc ? `&location=${searchLoc}` : '';
		query += searchDate ? `&startDate=${searchDate[0]}` : '';
		query += searchDate ? `&endDate=${searchDate[1]}` : '';
		navigate(query);
	}, [searchDate, searchCat, searchLoc, searchStartPrice, searchEndPrice]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let startDate = searchDate[0].format();
		let endDate = searchDate[1].format();
		console.clear();
		console.log('startdate:', startDate, 'enddate:', endDate);

		let query = `/allFilter?experience=${experience}`;

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
					<Form onSubmit={handleSubmit} className='Filter'>
						<div className='category-filter'>
							<Field
								className='select'
								value={searchCat}
								onChange={(e) => {
									setSearchCat(e.target.value);
									console.log(searchCat);
								}}
								name='categoryfilter'
								as='select'
							>
								<option className='option' value=''>
									Categoría
								</option>
								{categories.map((cat) => (
									<option className='option' key={cat.id} cat={cat}>
										{cat.title}
									</option>
								))}
							</Field>
						</div>
						<div className='location-filter'>
							<Field
								className='select'
								value={searchLoc}
								onChange={(e) => {
									setSearchLoc(e.target.value);
									console.log(searchLoc);
								}}
								name='locationfilter'
								as='select'
							>
								<option className='option' value=''>
									Localización
								</option>
								{filteredLocations.map((loc, index) => (
									<option className='option' key={index}>
										{loc.location}
									</option>
								))}
							</Field>
						</div>
						<div className='price-filter'>
							<div className='start-price'>
								{searchStartPrice == 0 ? (
									<p>Precio mínimo</p>
								) : (
									`Desde ${searchStartPrice} €`
								)}
								<Field
									className='slider'
									value={searchStartPrice}
									onChange={(e) => {
										setSearchStartPrice(e.target.value);
										console.log(searchStartPrice);
									}}
									name='startpricefilter'
									type='range'
									start={0}
									min={0}
									max={1000}
									step={50}
								/>
							</div>

							<div className='end-price'>
								{searchEndPrice == 0 ? (
									<p>Precio máximo</p>
								) : (
									`Hasta ${searchEndPrice} €`
								)}
								<Field
									className='slider'
									value={searchEndPrice}
									onChange={(e) => {
										setSearchEndPrice(e.target.value);
										console.log(searchEndPrice);
									}}
									name='endpricefilter'
									type='range'
									start={0}
									min={0}
									max={1000}
									step={50}
								/>
							</div>
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

						<div className='datefilter'>
							<div className='DateSearch'>
								{' '}
								<FaCalendarAlt
									style={{
										color: 'black',
										fontSize: '24px',
										marginRight: '5px',
									}}
								/>
								<DatePicker
									placeholder='Rango de fecha'
									className='date purple'
									value={searchDate}
									onChange={setSearchDate}
									range
									minDate={4}
									maxDate={0}
									hideOnScroll
									inputClass='custom-input'
									animations={[opacity()]}
								/>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Filter;
