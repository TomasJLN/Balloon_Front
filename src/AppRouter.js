import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardRouter } from './DashboardRouter';
import { ErrorPage } from './components/errorPage/ErrorPage';
import ExperienceReserve from './components/experienceReserve/ExperienceReserve';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import { NotFound } from './components/notfound/NotFound';
import { Profile } from './components/profile/Profile';
import Register from './components/register/Register';
import SearchBar from './components/searchBar/SearchBar';
import ShowResults from './components/showResults/ShowResults';
import ContactForm from './forms/Contact_form/ContactForm';
import Experience from './pages/experience/Experience';

export const AppRouter = () => {
  return (
    <>
      <SearchBar />
      <Routes>
        <Route path="/" element={<ShowResults />} />
        <Route path="contact-form" element={<ContactForm />} />
        <Route path="account" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="dashboard" element={<DashboardRouter />} /> */}
        <Route path="profile" element={<Profile />} />
        <Route path="experience/:id" element={<Experience />} />
        <Route path="experienceReserve/:id" element={<ExperienceReserve />} />
        <Route path="allFilter" element={<ShowResults />} />
        <Route path="error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
