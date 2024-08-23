import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Form, Alert, Card } from "react-bootstrap";
import Button from "@mui/material/Button";

function EditProduct() {
  const { id } = useParams(); // Get the product ID from URL params
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors, isDirty } } = useForm();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch the product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_BASE_URL}/products/updateProduct/${id}`,
          {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data.updatedProduct);

        // Populate form with existing product data
        setValue("productName", data.updatedProduct.productName);
        setValue("productOrignalPrice", data.updatedProduct.productOrignalPrice);
        setValue("productDiscountPrice", data.updatedProduct.productDiscountPrice);
        setValue("productQuantity", data.updatedProduct.productQuantity);
      } catch (error) {
        console.error("Fetch error: ", error);
        setError("Failed to fetch product details. Please check your API URL and server.");
      }
    };

    fetchProduct();
  }, [id, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/products/updateProduct/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess(true);
      setError(null);
      console.log(result);
      alert("Product Updated Successfully");
      navigate(`/account/my-products`);
    } catch (error) {
      console.error("Update error: ", error);
      setError("Failed to update product. Please check your API URL and server.");
      setSuccess(false);
    }
  };

  return (
    <Container className="mt-5 pt-4 pt-lg-5 mb-5">
      <h1 className="text-center my-5">Edit Product</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Product updated successfully!</Alert>}
      <div className="row justify-content-between">
        <div className="col-lg-6 mt-3 hd-flex flex-column  overflow-hidden  justify-content-center" style={{height:"480px", objectFit:"cover"}}>
          {product && product.productImage && (
            <img 
              src={product.productImage} 
              alt="Product" 
              className="img-fluid" 
              loading="lazy" 
              style={{height:"480px", objectFit:"cover"}}
            />
          )}
        </div>
        <div className="col-lg-6 mt-3">
        {product ? (
          <Card className="shadow-md p-3 p-lg-5">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("productName", { required: true })}
                  isInvalid={!!errors.productName}
                />
                <Form.Control.Feedback type="invalid">
                  Product Name is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="productOrignalPrice" className="mt-3">
                <Form.Label>Original Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...register("productOrignalPrice", { required: true })}
                  isInvalid={!!errors.productOrignalPrice}
                />
                <Form.Control.Feedback type="invalid">
                  Original Price is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="productDiscountPrice" className="mt-3">
                <Form.Label>Discount Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...register("productDiscountPrice")}
                />
              </Form.Group>
              <Form.Group controlId="productQuantity" className="mt-3">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                  type="number"
                  {...register("productQuantity", { required: true })}
                  isInvalid={!!errors.productQuantity}
                />
                <Form.Control.Feedback type="invalid">
                  Product Quantity is required
                </Form.Control.Feedback>
              </Form.Group>
              <Button 
                type="submit" 
                variant="outlined" 
                className="mt-3" 
                disabled={!isDirty} // Disable the button until there's a change
              >
                Update Product
              </Button>
            </Form>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
        </div>
      </div>
    </Container>
  );
}

export default EditProduct;
