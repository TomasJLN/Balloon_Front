import React from 'react';
import { Background } from '../../components/background/Background';
import Featured from '../../components/featured/Featured';
import SearchBar from '../../components/searchBar/SearchBar';

const Home = () => {
  return (
    <>
      <hr />
      <SearchBar />
      <hr />
      <Featured />
    </>
  );
};

export default Home;
