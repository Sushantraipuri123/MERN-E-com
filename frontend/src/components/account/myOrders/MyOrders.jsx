import { useEffect, useState } from "react";
import { useAuth } from "../../../store/Auth";
import { Spinner, Table } from "react-bootstrap";
import Button from "@mui/material/Button"; // Import MUI Button
import { styled } from "@mui/material/styles";

function MyOrders() {
  const { user } = useAuth();
  const userdata = user?.userData;
  const orderdBy = userdata?._id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_BASE_URL}/orders/my-orders/${orderdBy}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Fetch product data for each order's `orderedProducts`
        const ordersWithProductData = await Promise.all(
          data.map(async (order) => {
            try {
              const productResponse = await fetch(
                `${import.meta.env.VITE_APP_API_BASE_URL}/products/singleProduct/${order.orderdProduct}`
              );

              if (!productResponse.ok) {
                throw new Error(`Product HTTP error! Status: ${productResponse.status}`);
              }

              const productData = await productResponse.json();
              console.log(`Product data for ID ${order.orderdProduct}:`, productData);

              return { ...order, productImage: productData.body.productImage };
            } catch (productError) {
              console.error(`Error fetching product for order ${order._id}:`, productError);
              return order; // Return order without product image if fetching fails
            }
          })
        );

        setOrders(ordersWithProductData);
  console.log("hjksdhfakjsdhfklahslk",ordersWithProductData)
      } catch (error) {
        console.error("Fetch error: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderdBy) {
      fetchOrders();
      const intervalId = setInterval(fetchOrders, 30000); // Polling every 30 seconds
      return () => clearInterval(intervalId);
    }
  }, [orderdBy]);


  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // Styled MUI Button for Cancel (Red Color)
  const CancelButton = styled(Button)({
    backgroundColor: "#d32f2f",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#b71c1c",
    },
  });

  return (
    <div className="container mt-5 mb-5">
      {orders.length > 0 ? (
          <Table striped  responsive>
            <thead>
              <tr className="py-3">
                <th>Product Image</th>
                <th>Order Price</th>
                <th>Order Quantity</th>
                <th>Order Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className="py-4" key={order._id}>
                  <td
                        style={{ width: "180px", height: "70px", overflow: "hidden" , objectFit: "contain" }}
                  >
                    {order.productImage ? (
                      <img
                        src={order.productImage}
                        alt="Product"
                        style={{ width: "100px", height: "auto", objectFit: "contain"   }}
                      />
                    ) : (
                      "No image available"
                    )}
                  </td>
                  <td className="align-middle">{order.orderPrice}</td>
                  <td className="align-middle">{order.orderQuantity}</td>
                  <td className="align-middle">{order.orderStatus}</td>
                  <td className="align-middle">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => console.log(`View order: ${order._id}`)}
                      className="me-3 mt-1 text-decoration-none"
                    >
                      View
                    </Button>
                    <CancelButton
                      variant="outlined"
                      className="mt-2"
                      onClick={() => console.log(`Cancel order: ${order._id}`)}
                    >
                      Cancel
                    </CancelButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default MyOrders;
