import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoSearchSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Search() {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/products/search?searchQuery=${searchQuery}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data.body);
      } else {
        console.error("Search error:", data.message);
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
  };

  const calculateDiscountPercentage = (originalPrice, discountPrice) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  return (
    <>
      <p onClick={handleShow} className="me-2 nav-icon h4">
        <IoSearchSharp />
      </p>
      <Offcanvas 
        show={show} 
        onHide={handleClose} 
        placement="top"
        style={{ height: '100vh', overflowY: 'auto' }}
      >
        <Offcanvas.Header closeButton>
          <div></div>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ paddingBottom: '20px' }}>
          <h4 className="text-center my-3">What are you looking for?</h4>
          <div className='container mt-4 mb-3 d-flex align-items-center border'>
            <input
              type="text"
              className='w-100 h-25'
              style={{ border: 'none', outline: 'none' }}
              placeholder='Search our products'
              value={query}
              onChange={handleSearch}
            />
            <span className='h4'><IoSearchSharp /></span>
          </div>

          {/* Conditionally render search results if there's a query and results */}
          {query && results.length > 0 && (
            <div className='search-results mt-4'>
              <ul className="row">
                {results.map((product) => (
                  <div key={product._id} className="col-md-3 col-lg-2">
                    <Link
                      to={`/products/${product._id}`}
                      className="text-decoration-none"
                      onClick={handleClose} // Close the drawer when a product is clicked
                    >
                      <div className="card mb-4">
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "300px",
                            overflow: "hidden",
                          }}
                        >
                          {product.productDiscountPrice > 0 && (
                            <div className="discount-badge">
                              {calculateDiscountPercentage(
                                product.productOrignalPrice,
                                product.productDiscountPrice
                              )}
                              % OFF
                            </div>
                          )}
                          <img
                            src={product.productImage}
                            className="card-img-top"
                            alt={product.productName}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="card-body">
                          <h5
                            className="card-title text-center text-bold text-black my-3 Urbanist text-capitalize"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.productName}
                          </h5>
                          <div className="d-flex d-md-block d-lg-flex justify-content-between flex-wrap">
                            <p className="card-text text-center">
                              {product.productDiscountPrice > 0 ? (
                                <>
                                  <span className="orignal-Price">
                                    <strong>Rs</strong>{" "}
                                    {product.productDiscountPrice}
                                  </span>
                                  <span
                                    className="discounted-price"
                                    style={{
                                      textDecoration: "line-through",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    <strong>Rs</strong>{" "}
                                    {product.productOrignalPrice}
                                  </span>
                                </>
                              ) : (
                                <span className="orignal-Price">
                                  <strong>Rs</strong> {product.productOrignalPrice}
                                </span>
                              )}
                            </p>

                            {/* Stock Status */}
                            <p
                              style={{
                                color:
                                  product.productQuantity === 0
                                    ? "red"
                                    : product.productQuantity <= 9
                                    ? "orange"
                                    : "green",
                              }}
                            >
                              {product.productQuantity === 0
                                ? "No Stock"
                                : product.productQuantity <= 9
                                ? "Few Left"
                                : "In Stock"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          )}

          {/* Conditionally render message if there's a query but no results */}
          {query && results.length === 0 && (
            <p className="text-center">No products found for "{query}"</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Search;
