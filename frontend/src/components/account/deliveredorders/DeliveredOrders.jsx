import { useEffect, useState } from "react";
import { useAuth } from "../../../store/Auth";
import { Spinner, Table } from "react-bootstrap";
import Button from "@mui/material/Button"; 

function DeliveredOrders() {
  const { user } = useAuth();
  const userdata = user?.userData;
  const selledBy = userdata?._id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_BASE_URL}/orders/recived-orders/${selledBy}`,
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

        // Filter orders to only include those with status 'Delivered'
        const deliveredOrders = ordersWithProductData.filter(order => order.orderStatus === 'delivered');

        setOrders(deliveredOrders);
      } catch (error) {
        console.error("Fetch error: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (selledBy) {
      fetchOrders();
      const intervalId = setInterval(fetchOrders, 30000); // Polling every 30 seconds
      return () => clearInterval(intervalId);
    }
  }, [selledBy]);

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

  return (
    <div className="container mt-5 mb-5">
      {orders.length > 0 ? (
        <Table striped  responsive>
          <thead>
            <tr className="py-3">
              <th>Product Image</th>
              <th>Order Price</th>
              <th>Order Quantity</th>
              <th>Order Size</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="py-4" key={order._id}>
                <td
                  style={{
                    width: "180px",
                    height: "70px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {order.productImage ? (
                    <img
                      src={order.productImage}
                      alt="Product"
                      style={{ width: "100px", height: "auto", objectFit: "contain" }}
                    />
                  ) : (
                    "No image available"
                  )}
                </td>
                <td className="align-middle">{order.orderPrice}</td>
                <td className="align-middle">{order.orderQuantity}</td>
                <td className="align-middle">{order.selectedSize}</td>
                <td className="align-middle">{order.orderStatus}</td>
                <td className="align-middle">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => console.log(`View order: ${order._id}`)}
                    className="me-3 mt-1 text-decoration-none"
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h2 className="text-center Urbanist">No delivered orders found.</h2>
      )}
    </div>
  );
}

export default DeliveredOrders;
