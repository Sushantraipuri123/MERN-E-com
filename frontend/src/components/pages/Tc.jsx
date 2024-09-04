import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Tc() {
  return (
    <>
      <div className="container-fluid bg-single-product py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h5 className="text-center Urbanist mt-5">HOME / Terms & Conditions</h5>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="container py-5">
        <Row>
          <Col md={12}>
            <h2 className="text-center Urbanist mb-4">Terms & Conditions</h2>
            <p className="text-muted">
              Welcome to our e-commerce platform. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing or using our website, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please do not use our website.
            </p>

            <h4 className="Urbanist mt-4">1. Introduction</h4>
            <p className="text-muted">
              These Terms and Conditions govern your use of our website and services. By accessing our website, you agree to these terms in full. If you disagree with these terms or any part of these terms, you must not use our website.
            </p>

            <h4 className="Urbanist mt-4">2. User Responsibilities</h4>
            <p className="text-muted">
              You must be at least 18 years of age to use our website. You agree to provide accurate and complete information when registering or making a purchase. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
            </p>

            <h4 className="Urbanist mt-4">3. Intellectual Property</h4>
            <p className="text-muted">
              All content on our website, including text, graphics, logos, and images, is the property of our company or its licensors. You may not reproduce, distribute, or otherwise use any content without our express written consent.
            </p>

            <h4 className="Urbanist mt-4">4. Product Listings</h4>
            <p className="text-muted">
              We strive to ensure that product descriptions and pricing are accurate. However, errors may occur. If you find a discrepancy, please contact us immediately, and we will address the issue.
            </p>

            <h4 className="Urbanist mt-4">5. Payments and Refunds</h4>
            <p className="text-muted">
              Payments must be made through the available payment methods on our website. Refunds will be processed according to our return policy. Please review our return policy for more details.
            </p>

            <h4 className="Urbanist mt-4">6. Limitation of Liability</h4>
            <p className="text-muted">
              Our liability is limited to the maximum extent permitted by law. We are not responsible for any indirect, incidental, or consequential damages arising from the use of our website or services.
            </p>

            <h4 className="Urbanist mt-4">7. Changes to Terms</h4>
            <p className="text-muted">
              We reserve the right to modify these terms at any time. Changes will be posted on this page, and your continued use of the website constitutes acceptance of the updated terms.
            </p>

            <h4 className="Urbanist mt-4">8. Contact Us</h4>
            <p className="text-muted">
              If you have any questions about these Terms and Conditions, please contact us at support@eshop.com or call us at +91 12345-67890.
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tc;
