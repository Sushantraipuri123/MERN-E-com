import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/Auth";
import { useState } from "react";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("productOriginalPrice", data.productOriginalPrice);
      formData.append("productDiscountPrice", data.productDiscountPrice);
      formData.append("productDescription", data.productDescription);
      formData.append("productQuantity", data.productQuantity);
      formData.append("category", data.category);
      formData.append("productBrand", data.productBrand);
      formData.append("createdBy", user ? user.userData._id.toString() : null);
      
      if (selectedFile) {
        formData.append("productImage", selectedFile);
      }

      const response = await fetch(
        "http://localhost:9001/products/createProduct",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Product created successfully!");
        console.log(data),
        reset();
      } else {
        const errorData = await response.json();
        alert(
          `Failed to create product: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      alert("An error occurred while creating the product.");
    }
  };

  return (
    <Container className="mb-5">
      <h2 className="my-4">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            {...register("productName", { required: "Product name is required" })}
            className={`form-control ${errors.productName ? "is-invalid" : ""}`}
          />
          {errors.productName && (
            <div className="invalid-feedback">{errors.productName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="productOriginalPrice" className="form-label">
            Original Price
          </label>
          <input
            id="productOriginalPrice"
            type="number"
            {...register("productOriginalPrice", { required: "Original price is required" })}
            className={`form-control ${errors.productOriginalPrice ? "is-invalid" : ""}`}
          />
          {errors.productOriginalPrice && (
            <div className="invalid-feedback">{errors.productOriginalPrice.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="productDiscountPrice" className="form-label">
            Discount Price
          </label>
          <input
            id="productDiscountPrice"
            type="number"
            {...register("productDiscountPrice", { required: "Discount price is required" })}
            className={`form-control ${errors.productDiscountPrice ? "is-invalid" : ""}`}
          />
          {errors.productDiscountPrice && (
            <div className="invalid-feedback">{errors.productDiscountPrice.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Description
          </label>
          <textarea
            id="productDescription"
            {...register("productDescription", { required: "Product description is required" })}
            className={`form-control ${errors.productDescription ? "is-invalid" : ""}`}
          ></textarea>
          {errors.productDescription && (
            <div className="invalid-feedback">{errors.productDescription.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="productQuantity" className="form-label">
            Quantity
          </label>
          <input
            id="productQuantity"
            type="number"
            {...register("productQuantity", { required: "Product quantity is required" })}
            className={`form-control ${errors.productQuantity ? "is-invalid" : ""}`}
          />
          {errors.productQuantity && (
            <div className="invalid-feedback">{errors.productQuantity.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            id="category"
            type="text"
            {...register("category", { required: "Product category is required" })}
            className={`form-control ${errors.category ? "is-invalid" : ""}`}
          />
          {errors.category && (
            <div className="invalid-feedback">{errors.category.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="productBrand" className="form-label">
            Brand
          </label>
          <input
            id="productBrand"
            type="text"
            {...register("productBrand", { required: "Product brand is required" })}
            className={`form-control ${errors.productBrand ? "is-invalid" : ""}`}
          />
          {errors.productBrand && (
            <div className="invalid-feedback">{errors.productBrand.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Product Image
          </label>
          <input
            id="productImage"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className={`form-control ${errors.productImage ? "is-invalid" : ""}`}
          />
          {errors.productImage && (
            <div className="invalid-feedback">{errors.productImage.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Create Product
        </button>
      </form>
    </Container>
  );
};

export default AddProduct;
