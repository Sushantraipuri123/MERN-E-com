import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import moment from "moment";
import './OrderDetails.css'; 
import Button from '@mui/material/Button';
import { styled } from "@mui/material/styles";


function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/orders/getOrderById/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Order Data:", data); // Log the data to the console
          setOrder(data.body); // Update state with the fetched data
        } else {
          console.error("Failed to fetch order data");
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return null;

  const orderDate = moment(order.createdAt).format("MMMM Do YYYY");
  const deliveryDate = order.orderStatus.toLowerCase() === 'cancelled'
    ? 'Order Cancelled'
    : order.orderStatus.toLowerCase() === 'delivered'
    ? 'Delivered'
    : moment(order.createdAt).add(5, 'days').format("MMMM Do YYYY");

  const steps = order.orderStatus.toLowerCase() === 'cancelled'
    ? ['Pending', 'Cancelled']
    : ['Pending', 'Shipped', 'Delivered'];

  const currentStep = () => {
    switch (order.orderStatus.toLowerCase()) {
      case 'pending':
        return 0;
      case 'shipped':
        return 1;
      case 'delivered':
        return 2;
      case 'cancelled':
        return 1;
      default:
        return 0;
    }
  };

  const cancelOrder = async () => {
    if (isCanceling) return; // Prevent multiple submissions

    setIsCanceling(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/orders/cancel-order/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Order cancelled successfully");
        // Update the order state to reflect the cancellation
        setOrder((prevOrder) => ({
          ...prevOrder,
          orderStatus: "cancelled",
        }));
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Failed to cancel order");
      console.error("Error cancelling order:", error);
    } finally {
      setIsCanceling(false);
    }
  };

   // Styled MUI Button for Cancel (Red Color)
   const CancelButton = styled(Button)({
    backgroundColor: "#d32f2f",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#b71c1c",
    },
  });

  return (
    <>
      <div className="container-fluid bg-single-product py-5">
        <div>
          <h5 className="text-center Urbanist mt-5">HOME / Track Order</h5>
        </div>
      </div>

      <Container className="my-4">
        <Card>
          <Card.Header className="Urbanist h3 p-3">Order Status</Card.Header>
          <Card.Body>
            <Stepper
              activeStep={currentStep()}
              alternativeLabel
              className="custom-stepper"
            >
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Card.Body>
          <div className="d-flex mb-3 justify-content-around mt-4 border rounded mx-4 p-4">
            <div>
            <strong>Order Date:</strong> {orderDate}
            </div>
            <div>
            <strong>Delivery Date:</strong> {deliveryDate}
            </div>
          </div>
        </Card>


        <Row className="my-4">
          <Col md={8} className="mt-3">
            <Card>
              <Card.Header className="Urbanist h4 p-3">Order Details</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Order ID:</strong> {order._id}</ListGroup.Item>
                <ListGroup.Item><strong>Order Price:</strong> {order.orderPrice}</ListGroup.Item>
                <ListGroup.Item><strong>Order Quantity:</strong> {order.orderQuantity}</ListGroup.Item>
                <ListGroup.Item><strong>Payment Method:</strong> {order.paymentMethods}</ListGroup.Item>
                <ListGroup.Item><strong>Selected Size:</strong> {order.selectedSize}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={4} className="mt-3">
            <Card>
              <Card.Header className="Urbanist h4 p-3">Shipping Information</Card.Header>
              <Card.Body>
                {order.addresses && order.addresses.map((address, index) => (
                  <div key={index} className="mb-3">
                    <p><strong>Country:</strong> {address.country}</p>
                    <p><strong>City:</strong> {address.city}</p>
                    <p><strong>Address:</strong> {address.address}</p>
                    <p><strong>Nearby Landmark:</strong> {address.NerabyLandMark}</p>
                    <p><strong>Pincode:</strong> {address.Pincode}</p>
                    <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="text-center">
            <Button variant="outlined" className="me-2 mt-3">Contact Support</Button>
            {order.orderStatus.toLowerCase() !== 'delivered' && order.orderStatus.toLowerCase() !== 'cancelled' && (
              <CancelButton className="mt-3" variant="" onClick={cancelOrder} disabled={isCanceling}>
                {isCanceling ? 'Canceling...' : 'Cancel Order'}
              </CancelButton>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OrderDetails;
