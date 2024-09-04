import { Container, Row, Col } from 'react-bootstrap';

function Refund() {
  return (
    <>
      <div className="container-fluid bg-single-product py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h5 className="text-center Urbanist mt-5">HOME / Refund Policy</h5>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="container py-5">
        <Row>
          <Col md={12}>
            <h2 className="text-center Urbanist mb-4">Refund Policy</h2>
            <p className="text-muted">
              We want you to be completely satisfied with your purchase. If you are not satisfied with your order, please review our refund policy to understand the conditions and process for requesting a refund.
            </p>

            <h4 className="Urbanist mt-4">1. Refund Eligibility</h4>
            <p className="text-muted">
              To be eligible for a refund, the item must be returned within 30 days of receipt. The item should be in its original condition, unused, and with all original packaging and tags intact.
            </p>

            <h4 className="Urbanist mt-4">2. Non-Refundable Items</h4>
            <p className="text-muted">
              Certain items are non-refundable, including but not limited to, perishable goods, customized products, and digital downloads. Please check the product description for refund eligibility before making a purchase.
            </p>

            <h4 className="Urbanist mt-4">3. Refund Process</h4>
            <p className="text-muted">
              To initiate a refund, please contact our customer support team with your order number and reason for the refund. Once we receive and inspect the returned item, we will process the refund to your original payment method.
            </p>

            <h4 className="Urbanist mt-4">4. Shipping Costs</h4>
            <p className="text-muted">
              Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund amount, unless the return is due to a mistake on our part.
            </p>

            <h4 className="Urbanist mt-4">5. Refund Timing</h4>
            <p className="text-muted">
              Refunds are typically processed within 7-10 business days after we receive the returned item. Please note that it may take additional time for the refund to appear in your account depending on your payment provider.
            </p>

            <h4 className="Urbanist mt-4">6. Contact Us</h4>
            <p className="text-muted">
              If you have any questions about our refund policy or need assistance with a refund request, please contact us at refunds@eshop.com or call us at +91 12345-67890. Our team is here to help.
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Refund;
