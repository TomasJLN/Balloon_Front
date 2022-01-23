import React from 'react';
import ContactForm from '../../forms/contact_form/ContactForm';
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Contact = () => {
  return (
    <>
      <Header />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Contact;
