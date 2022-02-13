import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorPage } from '../components/errorPage/ErrorPage';
import Booking from '../components/booking/Booking';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import SearchBar from '../components/searchBar/SearchBar';
import ShowResults from '../components/showResults/ShowResults';
import ContactForm from '../forms/Contact_form/ContactForm';
import Privacity from '../pages/privacity/Privacity';
import Conditions from '../pages/conditions/Conditions';
import Faq from '../pages/faq/Faq';
import Footer from '../components/footer/Footer';
import { UserRoute } from './UserRoute';
import { UserContext } from '../contexts/UserContext';
import Experience from '../pages/experience/Experience';

export const PublicRoute = () => {
	const [user, setUser] = useContext(UserContext);

	return (
		<div>
			{user.role !== 'admin' && <SearchBar />}
			<Routes>
				<Route path='privacity' element={<Privacity />} />
				<Route path='faq' element={<Faq />} />
				<Route path='conditions' element={<Conditions />} />
				<Route path='' element={<ShowResults />} />
				<Route path='contact-form' element={<ContactForm />} />
				<Route path='account' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='experience/:id' element={<Experience />} />
				<Route path='booking/:id' element={<Booking />} />
				<Route path='allFilter' element={<ShowResults />} />
				<Route path='error' element={<ErrorPage />} />
				<Route path='*' element={<UserRoute />} />
			</Routes>
			{user.role !== 'admin' && <Footer />}
		</div>
	);
};
