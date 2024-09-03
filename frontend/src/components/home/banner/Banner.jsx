import './Banner.css'
import { Link } from 'react-router-dom'

function Banner() {
  const columnStyle = {
    padding: 0, 
    margin: 0, 
    background: '#e4edf6', 
 
  };

  const imgStyle = {
    width: '100%', 
    height: 'auto', 
    display: 'block', 
  };

  return (
    <div className="container my-5">
      <div className="row o">
        
        <div className="col-lg-6 d-flex justify-content-between" style={columnStyle}>
          <div className='p-5'>
          <h2 className='Urbanist text-decoration-underline'>Feel pretty, Feel classy</h2>
          <h1 className='mt-4 Urbanist fs-1 fw-bolder'>
          30% OFF
          </h1>
          <h3>For online purchase</h3>
          <Link to='/products' className='text-decoration-none'>
          <button className="cart-btn border-2 px-5 p-4 mt-3" >
                Collection
              </button>
              </Link>
          </div>
          {/* <h1 className="rotated-text">
        collection
      </h1> */}
        </div>
        <div className="col-lg-6 " style={columnStyle}>
          <img 
            src="https://mb-demo1.myshopify.com/cdn/shop/files/banner1_78752618-8fe6-4899-a42e-b807ba9e84b7.jpg?v=1694412274" 
            alt="Banner" 
            className="img-fluid" 
            style={imgStyle}
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
