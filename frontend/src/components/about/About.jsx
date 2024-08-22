import CircularText from "./CircularText";
import { GiFlyingFlag } from "react-icons/gi";
import { GiMicroscopeLens } from "react-icons/gi";
import { GiLifeSupport } from "react-icons/gi";
import Testimonial from './Testimonial'
const About = () => {
  return (
    <>
       <div className="container-fluid bg-hero-sections">
        <div>
          <h6 className="text-center mt-5">HOME - ABOUT</h6>
          <h1 className="text-center text-white">Our story</h1>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2 className="text-center mt-5 Urbanist mb-3">Who We Are</h2>
            <p className="text-muted text-center Urbanist">
            Welcome to our <strong>multi-vendor e-commerce</strong> platform, a digital marketplace designed to connect you with a wide range of sellers offering diverse products all in one place. Founded by <strong>Sushant Raipuri</strong>, a passionate 19-year-old MERN Stack Developer, this website was built with the goal of providing a seamless shopping experience while also serving as a project to enhance and refine development skills.
            </p>
          </div>
        </div>
         
        <div  style={{ textAlign: 'center' }}>    
      <CircularText />
    </div>
      </div>

        
      <div className="container-fluid bg-about py-5">
       <div className="container mt-4 mb-4">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
              <div className="card h-100 bg-primary mb-3">
                <div className="card-body">
                  <div className="mb-4 mt-3 text-center p-2  circle" style={{fontSize:"36px"}}>
                  <GiMicroscopeLens  />
                  </div>
                  <h4 className="card-title text-center my-3">Our Vision</h4>
                  <p className="card-text Urbanist text-center" style={{fontSize:"20px"}}>The most extraordinary people in the world today don’t have a career. They have a mission.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
              <div className="card h-100  bg-success mb-3">
                <div className="card-body h-100">
                <div className="mb-4 mt-3 text-center circle  p-2" style={{fontSize:"36px"}}>
                  <GiFlyingFlag />
                  </div>
                  <h4 className="card-title  text-center my-3 ">Our Mission</h4>
                  <p className="card-text Urbanist text-center" style={{fontSize:"20px"}}>Create the highest vision possible for your life, because you become what you believe.</p>
                  </div>
                  </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
              <div className="card h-100  bg-success mb-3">
                <div className="card-body h-100">
                <div className="mb-4 mt-3 text-center p-2 circle" style={{fontSize:"36px"}}>
                  <GiLifeSupport />
                  </div>
                  <h4 className="card-title  text-center my-3">Your support</h4>
                  <p className="card-text Urbanist text-center" style={{fontSize:"20px"}}>Create the highest vision possible for your life, because you become what you believe.</p>
                  </div>
                  </div>
                  </div>
          </div>
        </div>
       </div>

       <div className="container mt-5 mb-3">
        <div className="row justify-content-between">
        <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="about-page-img">
            <img src="/4.jpeg" alt="sdf" className="img-fluid about-img" />
              </div>
          </div>
          <div className="col-lg-5 col-md-6 col-sm-12 d-flex align-items-center mt-4">
           <div>
           <h2 className="text-center Urbanist mb-3">Sushant Raipuri </h2>
            <p className="text-muted text-center Urbanist">
            At <strong>Founder</strong>, of this multi-vendor e-commerce store, is a skilled MERN Stack Developer dedicated to creating a seamless shopping experience and advancing his web development expertise.
            </p>
            <h1 className="satisfy mt-3 text-end"> Sushant</h1>
           </div>
          </div>
         
        </div>
       </div>

       <div className="container mt-5 mb-5">
        <Testimonial/>
               </div>
    </>
  );
};

export default About;
