import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Featured from './components/featured/Featured';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import { NotFound } from './components/notfound/NotFound';
import Register from './components/register/Register';
import { TokenContextProvider } from './contexts/TokenContext';
import ContactForm from './forms/Contact_form/ContactForm';
import Experience from './pages/experience/Experience';
import Home from './pages/home/Home';

export const AppRouter = () => {
  return (
    <Router>
      <TokenContextProvider>
        <Home />
        <Routes>
          <Route exact path="/" element={<Featured />} />
          <Route exact path="/contact-form" element={<ContactForm />} />
          <Route exact path="/account" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/experience/:id" element={<Experience />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </TokenContextProvider>
    </Router>
  );
};
