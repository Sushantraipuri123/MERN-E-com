import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./SingleProduct.css";
import Rating from "@mui/material/Rating";
import { Modal, Overlay, Tooltip } from "react-bootstrap";
import { FaShareNodes } from "react-icons/fa6";
import { TbCoinRupeeFilled } from "react-icons/tb";
import AddReview from "../AddReview";
import { Container, Row, Col, Card } from "react-bootstrap";
function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [createdByUser, setCreatedByUser] = useState(null);
  // states to be shared into other components
  const [selectedSize, setSelectedSize] = useState("");
  const [count, setCount] = useState(1);

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current && imgRef.current) {
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const percentX = (x / width) * 100;
      const percentY = (y / height) * 100;

      imgRef.current.style.transformOrigin = `${percentX}% ${percentY}%`;
      imgRef.current.style.transform = `scale(2)`; // Zoom scale can be adjusted here
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1)"; // Reset zoom
      imgRef.current.style.transformOrigin = "center center"; // Reset transform origin
    }
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1); // Increment count
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1)); // Decrement count but not less than 1
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  //   current url
  const currentUrl = window.location.href;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const target = useRef(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch the product details
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

        // Fetch the user details using createdBy ID
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
        setCreatedByUser(userData); // Assuming user data is in data.body
      } catch (error) {
        console.error("Fetch error: ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();

    // Polling every 30 seconds (30000 milliseconds)
    const intervalId = setInterval(fetchProduct, 30000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [id, product]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(
      () => {
        setTooltipVisible(true);
        setTimeout(() => setTooltipVisible(false), 2000); // Hide tooltip after 2 seconds
      },
      (err) => {
        console.error("Failed to copy URL: ", err);
      }
    );
  };

  if (loading) {
    return <div className="container mt-5 mb-5 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mt-5 mb-5 text-center text-danger">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5 mb-5 text-center">Product not found</div>
    );
  }

  console.log();

  return (
    <>
      <div className="container-fluid bg-single-product py-5">
        <div>
          <h5 className="text-center Urbanist  mt-5">
            HOME / {product.productName}
          </h5>
        </div>
      </div>

      <div className="container mt-5 pt-lg-3 mb-5">
        <div className="row">
          <div className="col-md-6 mt-3">
            <div
              className="image-container border"
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={product.productImage}
                alt={product.productName}
                className="product-image"
                ref={imgRef}
              />
            </div>
          </div>
          <div className="col-md-6 mt-3 px-lg-5">
            <p className="text-muted fw-bold text-uppercase">
              {product.productBrand}
            </p>
            <h2 className="Urbanist mb-3 text-capitalize">
              {product.productName}
            </h2>
            <p className="d-flex align-items-center">
              <Rating
                name="read-only"
                value={product.ratings}
                readOnly
                className="me-2"
              />{" "}
              /{" "}
              <span className="text-muted ms-2">
                {product.reviews.length} ratings
              </span>
            </p>
            <div className="d-flex gap-4 my-3 align-items-center">
              {product.productDiscountPrice ? (
                <>
                  <div className="price text-black h2">
                    ₹{product.productDiscountPrice}
                  </div>
                  <div
                    className="price text-muted h5 "
                    style={{ textDecoration: "line-through" }}
                  >
                    ₹{product.productOrignalPrice}
                  </div>
                  <div className="off pb-2">
                    {Math.round(
                      ((product.productOrignalPrice -
                        product.productDiscountPrice) /
                        product.productOrignalPrice) *
                        100
                    )}
                    % OFF
                  </div>
                </>
              ) : (
                <div className="price text-black h2">
                  ₹{product.productOrignalPrice}
                </div>
              )}
            </div>

            <div className="product-inventory d-flex gap-4 mt-3 align-items-end">
              <h5>Availability: </h5>
              {product.productQuantity === 0 ? (
                <h6 className="pb-1 text-danger">Out of stock</h6>
              ) : product.productQuantity < 9 ? (
                <h6 className="pb-1 text-warning">
                  Hurry up! Only {product.productQuantity} left
                </h6>
              ) : (
                <h6 className="pb-1 text-success">
                  {product.productQuantity} in stock
                </h6>
              )}
            </div>

            <div className="devider my-4">
              <hr />
            </div>

            <div className="product-description my-3">
              <h5>Description:</h5>
              <p>{product.productDescription}</p>
            </div>

            {product.category !== "electronics" &&
              product.category !== "jewellery" &&
              product.category !== "Accessories" && (
                <div className="d-flex justify-content-between my-4 pt-lg-3">
                  <div className="d-flex">
                    <h5>Size:</h5>{" "}
                    <span className="text-muted ms-2">
                      {selectedSize ? selectedSize : "Select a size"}
                    </span>
                  </div>
                  <p className="d-flex gap-3">
                    <button
                      className={`size-btn text-center ${
                        selectedSize === "5" ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleSizeClick(
                          product.category === "mens-shoes" ||
                            product.category === "womens-shoes"
                            ? "5"
                            : "S"
                        )
                      }
                    >
                      {product.category === "mens-shoes" ||
                      product.category === "womens-shoes"
                        ? "5"
                        : "S"}
                    </button>
                    <button
                      className={`size-btn text-center ${
                        selectedSize === "6" ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleSizeClick(
                          product.category === "mens-shoes" ||
                            product.category === "womens-shoes"
                            ? "6"
                            : "M"
                        )
                      }
                    >
                      {product.category === "mens-shoes" ||
                      product.category === "womens-shoes"
                        ? "6"
                        : "M"}
                    </button>
                    <button
                      className={`size-btn text-center ${
                        selectedSize === "7" ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleSizeClick(
                          product.category === "mens-shoes" ||
                            product.category === "womens-shoes"
                            ? "7"
                            : "L"
                        )
                      }
                    >
                      {product.category === "mens-shoes" ||
                      product.category === "womens-shoes"
                        ? "7"
                        : "L"}
                    </button>
                    <button
                      className={`size-btn text-center ${
                        selectedSize === "8" ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleSizeClick(
                          product.category === "mens-shoes" ||
                            product.category === "womens-shoes"
                            ? "8"
                            : "XL"
                        )
                      }
                    >
                      {product.category === "mens-shoes" ||
                      product.category === "womens-shoes"
                        ? "8"
                        : "XL"}
                    </button>
                  </p>
                </div>
              )}

            <div className="d-flex my-4">
              <h5>Category:</h5>{" "}
              <span className="text-muted ms-2 text-capitalize">
                {" "}
                {product.category}
              </span>
            </div>

            <div className="d-flex mb-3 gap-3 flex-wrap">
              <span className="counter-btn text-uppercase p-4 d-flex align-items-center justify-content-between">
                <div className="counter">
                  <button
                    onClick={handleDecrement}
                    className="btn-decrement me-2"
                  >
                    -
                  </button>
                  <span className="counter-value">{count}</span>
                  <button
                    className="btn-increment ms-2"
                    onClick={handleIncrement}
                    disabled={count >= product.productQuantity}
                  >
                    +
                  </button>
                </div>
              </span>
              <button className="cart-btn border p-4">Add to cart</button>
              <button className="buy-btn border text-uppercase p-4">
                Buy it Now
              </button>
            </div>

            <div className="my-4">
              <span onClick={handleShow} className="share">
                {" "}
                <span className="me-2">
                  <FaShareNodes />
                </span>{" "}
                Share
              </span>
            </div>
            <div className="devider my-4">
              <hr />
            </div>

            <div className="my-4">
              <div className="d-flex gap-3">
                <h5>Delivery: </h5>
                <p>Estimated delivery time: 5-7 days</p>
              </div>
              <div className="d-flex gap-3 my-2">
                <h5>Returns: </h5>
                <p>Within 45 days of purchase</p>
              </div>
              <p>
                {" "}
                <span className="text-success h4">
                  <TbCoinRupeeFilled />
                </span>{" "}
                Cash on Delivery available
              </p>
            </div>

            <h3>Created by: {createdByUser?.name}</h3>
          </div>
        </div>
      </div>

      <div className="container mb-3">
        <div className="d-flex justify-content-around align-items-end">
          <div>
            <h2 className="">Reviews</h2>
          </div>
          <div className="pb-2">
            <AddReview />
          </div>
        </div>
      </div>

      <div className="devider my-4">
        <hr />
      </div>

      <Container className="mt-5">
        <Row>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review) => {
              const reviewedBy = review.reviewedBy || "Guest";
              const initial = reviewedBy.charAt(0).toUpperCase();

              return (
                <Col md={4} className="mb-4" key={review._id}>
                  <Card className="h-100">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>
                        <Rating value={review.rating} readOnly />
                      </Card.Title>
                      <div className="d-flex align-items-center mb-2">
                        <div
                          style={{
                            width: "37px",
                            height: "35px",
                            backgroundColor: "rgba(224, 224, 224, 0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "4px",
                            marginRight: "10px",
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "#333",
                          }}
                        >
                          {initial}
                        </div>
                        <p className="text-muted mb-0">{reviewedBy}</p>
                      </div>
                      <Card.Text
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {review.comment}
                      </Card.Text>
                      <div className="mt-auto">
                        {/* Add any footer content here if needed */}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Col>
              <h3 className="text-center">No reviews yet.</h3>
              <h5 className="text-center mt-4 mb-5">
                Become the first person to add a review
              </h5>
            </Col>
          )}
        </Row>
      </Container>

      {/* === modal body  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Current URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center overflow-hidden">
            <div className="border p-3">
              <span>{currentUrl}</span>
            </div>
          </div>
          <button
            ref={target}
            onClick={copyToClipboard}
            className="mt-4 mb-3 px-3 counter-btn "
          >
            Copy
          </button>
          <Overlay
            target={target.current}
            show={tooltipVisible}
            placement="top"
          >
            {(props) => (
              <Tooltip id="copy-tooltip" {...props}>
                Copied..!
              </Tooltip>
            )}
          </Overlay>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SingleProduct;
