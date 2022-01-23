import React from 'react';
import Featured from '../../components/featured/Featured';
import Footer from '../../components/footer/Footer';
import { Header } from '../../components/header/Header';
import NavBar from '../../components/navBar/navBar';
import SearchBar from '../../components/searchBar/SearchBar';

const Home = () => {
  return (
    <>
      <Header />
      <hr />
      <SearchBar />
      <hr />
    </>
  );
};

export default Home;
