import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import { NotFound } from './components/notfound/NotFound';
import { Profile } from './components/profile/Profile';
import Register from './components/register/Register';
import ShowResults from './components/showResults/ShowResults';
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
          <Route path="/" element={<ShowResults />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="/account" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/experience/:id" element={<Experience />} />
          <Route path="/allFilter" element={<ShowResults />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </TokenContextProvider>
    </Router>
  );
};
