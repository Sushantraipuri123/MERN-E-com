import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./CheckOut.css";
import { useAuth } from "../../store/Auth";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const location = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [createdByUser, setCreatedByUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Get the state from location
  const { selectedSize, count } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/products/singleProduct/${id}`,
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
        setProduct(data.body);
        setLoading(false);

        const userId = data.body.createdBy;
        const userResponse = await fetch(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/users/getsingleUser/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        setCreatedByUser(userData.body);
      } catch (error) {
        console.error("Fetch error: ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();

    const intervalId = setInterval(fetchProduct, 30000);

    return () => clearInterval(intervalId);
  }, [id]);

  const { user } = useAuth();
  const userdata = user?.userData;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to format numbers according to the Indian numbering system
  const formatPrice = (price) => {
    return price.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    });
  };

  // Calculate the product price based on discount or original price
  const productPrice =
    product.productDiscountPrice || product.productOrignalPrice;
  const subtotal = productPrice * count;
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Prepare the order data
      const orderData = {
        ...data,
        orderPrice: String(formatPrice(total)), // Convert productPrice to string
        orderQuantity: String(count), // Convert count to string
        selectedSize: selectedSize, // Include selected size if needed
        orderdBy: userdata?._id,
        orderdProduct: id, // Order by product
        seller: product.createdBy, // id of that user who haas created the product
      };

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/orders/createOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert("You have successfully ordered");
      // reset()
      // Navigate to /account/my-orders after successful order
      navigate("/account/my-orders");
      console.log("Order created successfully:", result);
    } catch (error) {
      console.error("Error creating order:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid bg-single-product py-5">
        <div>
          <h5 className="text-center Urbanist mt-5">HOME / Buy Now</h5>
          <h6 className="text-center Urbanist mt-3">{product?.productName}</h6>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 border p-lg-4">
            <h2 className="Urbanist mb-3">User Details</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Group Address Fields Together */}
              <fieldset>
                <legend>Address</legend>

                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("addresses[0].country", {
                      required: "Country is required",
                    })}
                    isInvalid={!!errors.addresses?.[0]?.country}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.addresses?.[0]?.country?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("addresses[0].city", {
                      required: "City is required",
                    })}
                    isInvalid={!!errors.addresses?.[0]?.city}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.addresses?.[0]?.city?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("addresses[0].address", {
                      required: "Address is required",
                    })}
                    isInvalid={!!errors.addresses?.[0]?.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.addresses?.[0]?.address?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nearby Landmark</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("addresses[0].NerabyLandMark")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("addresses[0].Pincode", {
                      required: "Pincode is required",
                    })}
                    isInvalid={!!errors.addresses?.[0]?.Pincode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.addresses?.[0]?.Pincode?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </fieldset>

              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  {...register("paymentMethods", {
                    required: "Payment method is required",
                  })}
                  isInvalid={!!errors.paymentMethods}
                  defaultValue="cod" // Set COD as the default value
                >
                  <option value="credit_card" disabled>
                    Credit Card
                  </option>
                  <option value="debit_card" disabled>
                    Debit Card
                  </option>
                  <option value="net_banking" disabled>
                    Net Banking
                  </option>
                  <option value="cod">Cash on Delivery</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.paymentMethods?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button className="buy-btn border p-4 my-4 w-100 align-items-center d-flex" type="submit">
                Place Order
              </Button>
            </Form>
          </div>

          <div className="col-md-6 bg-white border">
            <div className="sticky-top order-summary">
              <div className="p-lg-4">
                <h2 className="Urbanist mb-3">Order Summary</h2>
                {product && (
                  <div>
                    <div className="d-flex align-items-center">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        style={{
                          width: "65px",
                          height: "65px",
                          objectFit: "contain",
                        }}
                      />
                      <h5
                        className="ms-3"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.productName}
                      </h5>
                    </div>
                    <div className="mx-lg-4">
                      <div className="d-flex mt-3 justify-content-center">
                        <h5>{`Price: ${formatPrice(productPrice)}`}</h5>
                        <p className="text-muted ms-2">(per piece)</p>
                      </div>
                      <div className="d-flex justify-content-around">
                        <p>
                          <strong>Selected Size:</strong> {selectedSize}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {count}
                        </p>
                      </div>
                      <hr />
                      <div className="d-flex mt-3 justify-content-between">
                        <h5>Subtotal </h5> <h5>{formatPrice(subtotal)}</h5>
                      </div>
                      <div className="my-3">
                        <div className="d-flex justify-content-between">
                          <h5>Shipping</h5>
                          <h5 className="text-success">FREE shipping</h5>
                        </div>
                      </div>
                      <div className="d-flex mt-3 justify-content-between">
                        <h5>GST (18%) </h5> <h5>{formatPrice(gst)} </h5>
                      </div>
                      <div className="d-flex mt-4 justify-content-around">
                        <h4>Total</h4> <h4> {formatPrice(total)}</h4>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
