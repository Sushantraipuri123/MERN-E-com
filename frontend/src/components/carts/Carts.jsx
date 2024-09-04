import { useState, useEffect } from "react";
import { useAuth } from "../../store/Auth";
import { Card, Button, ListGroup, Image, Row, Col, Spinner } from "react-bootstrap";
import './Carts.css'; // Import the CSS file
import { Link } from "react-router-dom";

function Carts() {
  const { cart, removeFromCart, updateCartItemQuantity } = useAuth();
  const [products, setProducts] = useState({}); // Store fetched product data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProductData = async () => {
      const productIds = cart.map(item => item.id);
      const uniqueProductIds = [...new Set(productIds)]; // Ensure unique IDs

      try {
        const productDataPromises = uniqueProductIds.map(id =>
          fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/products/singleProduct/${id}`)
            .then(response => response.json())
            .then(data => ({ id, ...data })) // Add ID to fetched data
        );

        const productData = await Promise.all(productDataPromises);
        const productMap = productData.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});

        setProducts(productMap);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchProductData();
  }, [cart]);

  const handleRemoveItem = (productId) => {
    console.log("Removing product ID:", productId); // Debugging statement
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  console.log("Cart items:", cart);
  console.log("Products data:", products);

  return (
    <>
     <div className="container-fluid bg-single-product py-5">
        <div>
          <h5 className="text-center Urbanist  mt-5">
            HOME / Saved Items
          </h5>
        </div>
      </div>

    <div className="container mt-5 pt-lg-3">
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      ) : (
        cart.length === 0 ? (
          <h1 className="text-center text-muted my-5 pt-lg-4 pb-lg-5">Your cart is empty.</h1>
        ) : (
          <ListGroup variant="flush">
            {cart.map((item) => {
              const product = products[item.id]; // Get product data from state
              if (!product) return null; // Skip if product data is not yet available

              return (
                <ListGroup.Item key={item.id} className="mb-3">
                  <Card className="p-3 shadow-sm">
                    <Row>
                      <Col md={3}>
                        <Image
                          src={product.body.productImage}
                          alt={product.body.productName}
                          rounded
                          className="cart-image"
                        />
                      </Col>
                      <Col md={5}>
                        <h5  className="cart-product-name">{product.body.productName}</h5>
                        <p className="text-muted">
                          Price: ₹{product.body.productDiscountPrice ? product.body.productDiscountPrice : product.body.productOrignalPrice}
                        </p>
                        {item.size && <p className="text-muted">Size: {item.size}</p>} 
                      </Col>
                      <Col md={2} className="d-flex align-items-center">
                        <div className="counter border">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="btn-decrement me-2"
                          >
                            -
                          </button>
                          <span className="counter-value">{item.quantity}</span>
                          <button
                            className="btn-increment ms-2"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= product.body.productQuantity}
                          >
                            +
                          </button>
                        </div>
                      </Col>
                      <Col md={2} className="d-flex align-items-center justify-content-end">
                        <Link to={`/products/${item.id}`} className="text-decoration-none">
                          <Button variant="primary" size="sm" className="me-2">
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )
      )}
    </div>
    </>
  );
}

export default Carts;
