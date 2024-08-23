import { Container, Row, Col, Card } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useAuth } from "../../../store/Auth";

function Profile() {
  const { user } = useAuth();
  const userdata = user?.userData; // Safely access userData

  // Format createdAt to display month and year using vanilla JavaScript
  const formattedDate = userdata?.createdAt
    ? new Date(userdata.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  // Get the user's address details
  const address = userdata?.addresses?.[0];
  const fullAddress = address
    ? `${address.address}, ${address.city}, ${address.country} - ${address.Pincode}`
    : "N/A";

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <h3 className="text-center my-3">My Details</h3>
        <Col md={8} className="mt-4">
          <Card className="shadow-md">    
            <Card.Body className="p-lg-5">
              <Row>
                <Col md={6}>
                  <Card.Text style={{ fontSize: "1.2rem" }}>
                    <strong>Email:</strong> {userdata?.email}
                  </Card.Text>
                  <Card.Text style={{ fontSize: "1.2rem" }}>
                    <strong>Phone:</strong> {userdata?.phoneNumber || "N/A"}
                  </Card.Text>
                  <Card.Text style={{ fontSize: "1.2rem" }}>
                    <strong>Role:</strong> {userdata?.role || "N/A"}
                  </Card.Text>
                </Col>
                <Col md={6}>
                  <Card.Text style={{ fontSize: "1.2rem" }}>
                    <strong>Joined:</strong> {formattedDate}
                  </Card.Text>
                  <Card.Text style={{ fontSize: "1.2rem" }}>
                    <strong>Address:</strong> {fullAddress}
                  </Card.Text>
                </Col>
              <div className="mt-3">
              <hr />
                  {userdata?.role === "seller" && (
                    <>
                     <div className="d-flex justify-content-center">
                      <div>
                      <Card.Text style={{ fontSize: "1.2rem" }}>
                        <strong>Store Name:</strong> {userdata?.storeName}
                      </Card.Text>
                      <Card.Text style={{ fontSize: "1.2rem" }}>
                        <strong>GST No:</strong> {userdata?.gstNo}
                      </Card.Text>
                      </div>
                     </div>
                    </>
                  )}
              </div>
              </Row>
              <div className="text-center mt-4 mb-3">
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ fontSize: "1rem", padding: "0.75rem 2rem" }}
                >
                  Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
