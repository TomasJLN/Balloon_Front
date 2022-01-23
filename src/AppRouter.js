import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Featured from './components/featured/Featured';
import Footer from './components/footer/Footer';
import { Header } from './components/header/Header';
import ContactForm from './forms/Contact_form/ContactForm';
import Home from './pages/home/Home';

export const AppRouter = () => {
  return (
    <Router>
      <Home />
      <Routes>
        <Route exact path="/" element={<Featured />} />
        <Route exact path="/contact-form" element={<ContactForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};
