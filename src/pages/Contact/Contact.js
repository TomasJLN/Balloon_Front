import React, { useEffect } from "react";
import ContactForm from "../../forms/Contact_form/ContactForm";
import { Header } from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<Header />
			<ContactForm />
			<Footer />
		</>
	);
};

export default Contact;
