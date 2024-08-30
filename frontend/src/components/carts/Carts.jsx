import { useAuth } from "../../store/Auth";
import { Card, Button, ListGroup, Image, Row, Col } from "react-bootstrap";

function Carts() {
  const { cart, removeFromCart, updateCartItemQuantity } = useAuth();

  const handleRemoveItem = (productId) => {
    console.log("Removing product ID:", productId);  // Debugging statement
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="container mt-5 pt-lg-5">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ListGroup variant="flush">
          {cart.map((item) => (
            <ListGroup.Item key={item.id} className="mb-3">
              <Card className="p-3 shadow-sm">
                <Row>
                  <Col md={3}>
                    <Image src={item.productImage} alt={item.productName} fluid rounded />
                  </Col>
                  <Col md={5}>
                    <h5>{item.productName}</h5>
                    <p className="text-muted">Price: ₹{item.productOrignalPrice}</p>
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    <div className="d-flex">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-2 align-self-center">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col md={2} className="d-flex align-items-center justify-content-end">
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
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default Carts;
