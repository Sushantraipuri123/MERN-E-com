import React from 'react';
import './Explore.css'; // Import your custom CSS file

function Explore() {
  return (
    <>
      <section className='mt-4 footer-container pt-3 pb-4'>
        <h3 className="text-center Urbanist">
          Explore our wide range of products
        </h3>
        <div className="mt-3 mx-lg-5">
          <div className="row g-3">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="column-content">
                <div className="image-container">
                  <img src="https://mb-demo1.myshopify.com/cdn/shop/files/marbo-lyfestyle-categories-01.jpg?v=1693996942&width=376" alt="Product 1" className="img-fluid" />
                  <h2 className="image-heading">Shirt</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="column-content">
                <div className="image-container">
                  <img src="https://mb-demo1.myshopify.com/cdn/shop/files/marbo-lyfestyle-categories-02.jpg?v=1693996942&width=377" alt="Product 2" className="img-fluid" />
                  <h4 className="image-heading">Shoes</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="column-content">
                <div className="image-container">
                  <img src="https://mb-demo1.myshopify.com/cdn/shop/files/marbo-lyfestyle-categories-03.jpg?v=1693996942&width=376" alt="Product 3" className="img-fluid" />
                  <h4 className="image-heading">Bags</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="column-content">
                <div className="image-container">
                  <img src="https://mb-demo1.myshopify.com/cdn/shop/files/marbo-lyfestyle-categories-04.png?v=1693996942&width=377 " alt="Product 4" className="img-fluid" />
                  <h4 className="image-heading">Accessories</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Explore;
