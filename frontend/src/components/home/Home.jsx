import React from 'react';
import Hero from './herosection/Hero';
import CategoriesBlock from './categoriesblock/CategoriesBlock';

const Home = () => {
  return (
    <>
    <Hero/>
  
  <div className="container mt-4">
    <CategoriesBlock/>
  </div>
    </>
  );
};

export default Home;
