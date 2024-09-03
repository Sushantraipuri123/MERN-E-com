import Hero from './herosection/Hero';
import CategoriesBlock from './categoriesblock/CategoriesBlock';
import Marque from './marque/Marque';
import Banner from './banner/Banner';
import Brand from './brand/Brand';
import Explore from './explore/Explore';
import Blog from './Blog/Blog';

const Home = () => {
  return (
    <>
    <Hero/>
  
  <div className="container mt-4">
    <CategoriesBlock/>
  </div>

    <div className="container-fluid mt-3">
      <Marque/>
    </div>

    <div className="container-fluid mt-3">
      <Banner/>
    </div>

    <div className="container mt-3">
      <Brand/>
    </div>

    <div className="container-fluid ">
      <Explore/>
    </div>

    <div className="container mt-3">
      <Blog/>
    </div>
    
    </>
  );
};

export default Home;
