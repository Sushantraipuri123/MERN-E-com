import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Col, Row, Spinner } from 'react-bootstrap';
import { Typography, Box, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecivedOrdersDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/orders/getOrderById/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch order data');

        const data = await response.json();
        setOrder(data.body);
        await fetchUserDetails(data.body.orderdBy);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async (userId) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/users/getsingleUser/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch user details');

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchOrderData();
  }, [id]);

  const shipOrder = async (orderId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/orders/ship-order/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to update order status');

      alert('Order shipped successfully');
      setOrder((prevOrder) => ({ ...prevOrder, orderStatus: 'shipped' }));
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Error shipping order:', error);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <Typography variant="h6" component="div" mt={3}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Typography variant="h6" component="div" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <div className="container-fluid bg-single-product py-5">
        <Typography variant="h5" className="text-center Urbanist mt-5">
          HOME / Received Order
        </Typography>
      </div>

      <Container className="mt-5 mb-4">
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header as="h5">Order Details</Card.Header>
              <Card.Body>
                {order ? (
                  <Row>
                    {/* Order Information */}
                    <Col md={6}>
                      <Typography variant="h6" component="div" gutterBottom>
                        Order ID: {order._id}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Order Date: {new Date(order.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Status: {order.orderStatus}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Price: {order.orderPrice}
                      </Typography>
                      <Typography variant="h6" component="div" gutterBottom mt={3}>
                        Items:
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Quantity: {order.orderQuantity}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Size: {order.selectedSize}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Payment Method: {order.paymentMethods}
                      </Typography>
                    </Col>

                    {/* User Information */}
                    <Col md={6}>
                      {user && (
                        <>
                          <Typography variant="h6" component="div" gutterBottom mt={3}>
                            Ordered By:
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Name: {user.name}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Email: {user.email}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Phone Number: {user.phoneNumber}
                          </Typography>

                          <Typography variant="h6" component="div" gutterBottom mt={3}>
                            Ship To:
                          </Typography>
                          {user.addresses && user.addresses.length > 0 && (
                            <Box>
                              <Typography variant="body1" gutterBottom>
                                Country: {user.addresses[0].country}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                City: {user.addresses[0].city}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                Address: {user.addresses[0].address}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                Pincode: {user.addresses[0].Pincode}
                              </Typography>
                            </Box>
                          )}
                        </>
                      )}
                    </Col>
                  </Row>
                ) : (
                  <Typography variant="body1" component="div">
                    No order details available.
                  </Typography>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="text-center mt-5 mb-4">
      <Col>
          {order.orderStatus === 'pending' && (
            <Button onClick={() => shipOrder(order._id)} variant="outlined">
              Ship Order
            </Button>
          )}
          {order.orderStatus === 'shipped' && (
            <Typography variant="body1" color="primary">
              <h3>
              Customer will receive the product soon.

              </h3>
            </Typography>
          )}
          {order.orderStatus === 'delivered' && (
            <Typography variant="body1" color="success">
             <h3 className='text-capitalized text-success'> Order received by the customer.</h3>
            </Typography>
          )}
          {order.orderStatus === 'cancelled' && (
            <Typography variant="body1" color="success">
             <h3 className='text-capitalized text-danger'> Customer cancelled the order.</h3>
            </Typography>
          )}
        </Col>
      </Container>
    </>
  );
}

export default RecivedOrdersDetails;
