import  { useEffect, useState } from "react";
import { useAuth } from "../../../store/Auth";
import { Table, Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyProducts() {
  const { user } = useAuth();
  const userdata = user?.userData;
  const createdBy = userdata?._id;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("created by id", createdBy);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/products/myProducts/${createdBy}`,
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
        setProducts(data.body);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error: ", error);
        setLoading(false);
      }
    };

    fetchProduct();

    const intervalId = setInterval(fetchProduct, 30000);

    return () => clearInterval(intervalId);
  }, [createdBy]);

  const handleDelete = (productId) => {
    // Logic to delete the product by productId
    console.log(`Deleting product with ID: ${productId}`);
  };

  const truncateText = (text) => {
    if (!text) return "N/A";
    const words = text.split(" ");
    if (words.length <= 4) return text;
    return words.slice(0, 4).join(" ") + "...";
  };

  return (
    <Container className="mt-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped responsive>
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Original Price</th>
              <th>Discount Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td
                    className="align-middle"
                    style={{
                      width: "130px",
                      height: "130px",
                      objectFit: "cover",
                      overflow: "hidden",
                    }}
                  >
                    {product.productImage ? (
                      <Image
                        src={product.productImage}
                        rounded
                        style={{
                          width: "130px",
                          height: "130px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td
                    className="align-middle h4 text-nowrap text-truncate"
                    style={{ maxWidth: "200px" }}
                  >
                    {truncateText(product.productName)}
                  </td>
                  <td className="align-middle">
                    {product.productOrignalPrice
                      ? `₹${product.productOrignalPrice}`
                      : "N/A"}
                  </td>
                  <td className="align-middle">
                    {product.productDiscountPrice
                      ? `₹${product.productDiscountPrice}`
                      : "N/A"}
                  </td>
                  <td className="align-middle">
                    <Button
                      as={Link}
                      to={`/edit-product/${product._id}`}
                      variant="warning"
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default MyProducts;
