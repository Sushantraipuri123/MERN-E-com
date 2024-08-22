import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductsByCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(`${import.meta.env.VITE_APP_API_BASE_URL}/products/productsByCategory/${category}`, {
        headers,
      })
      .then((response) => {
        setProducts(response.data.body);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        setError("There was an error fetching the products.");
        setLoading(false);
      });
  }, [category]); // Use 'category' as a dependency to refetch if the category changes

  // Function to calculate the discount percentage
  const calculateDiscountPercentage = (originalPrice, discountPrice) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <>
      <div className="container-fluid bg-hero-sections">
        <div>
          <Link to='/products' className="text-decoration-none">
          <h4 className="text-center mt-5 text-black "> View All Products</h4>
          </Link>
          <h1 className="text-center text-white text-capitalize">{category}</h1>
        </div>
      </div>
      <div className="container-fluid mt-5 pt-4 mb-5 pb-3">
        <div className="row mt-4 mx-lg-4 justify-content-center">
          {products.length === 0 ? (
            <h3 className="text-center text-danger mt-5">No products found for this category.</h3>
          ) : (
            products.map((product) => (
              <div key={product._id} className="col-md-3 col-lg-2">
                <Link
                  to={`/products/${product._id}`}
                  className="text-decoration-none"
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
                        className="card-img-top "
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
                                <strong>Rs</strong> {product.productDiscountPrice}
                              </span>
                              <span
                                className="discounted-price"
                                style={{
                                  textDecoration: "line-through",
                                  marginLeft: "10px",
                                }}
                              >
                                <strong>Rs</strong> {product.productOrignalPrice}
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
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ProductsByCategory;
