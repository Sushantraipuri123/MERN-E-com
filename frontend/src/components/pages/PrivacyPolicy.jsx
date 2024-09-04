import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function PrivacyPolicy() {
  return (
    <>
      <div className="container-fluid bg-single-product py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h5 className="text-center Urbanist mt-5">HOME / Privacy Policy</h5>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="container py-5">
        <Row>
          <Col md={12}>
            <h2 className="text-center Urbanist mb-4">Privacy Policy</h2>
            <p className="text-muted">
              Welcome to our Privacy Policy page. Your privacy is important to us. This policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully.
            </p>

            <h4 className="Urbanist mt-4">1. Information We Collect</h4>
            <p className="text-muted">
              We collect various types of information in connection with your use of our website, including personal information you provide when you register, make a purchase, or contact us. This may include your name, email address, phone number, and payment information.
            </p>

            <h4 className="Urbanist mt-4">2. How We Use Your Information</h4>
            <p className="text-muted">
              The information we collect is used to process transactions, improve our website, communicate with you, and provide customer support. We may also use your information to send promotional materials and updates if you have opted in to receive them.
            </p>

            <h4 className="Urbanist mt-4">3. Data Protection and Security</h4>
            <p className="text-muted">
              We implement appropriate security measures to protect your information from unauthorized access, disclosure, or alteration. However, please be aware that no method of transmission over the internet or electronic storage is completely secure.
            </p>

            <h4 className="Urbanist mt-4">4. Sharing Your Information</h4>
            <p className="text-muted">
              We do not sell or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our website, conducting business, or providing services, provided they agree to keep your information confidential.
            </p>

            <h4 className="Urbanist mt-4">5. Cookies and Tracking Technologies</h4>
            <p className="text-muted">
              Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can manage your cookie preferences through your browser settings.
            </p>

            <h4 className="Urbanist mt-4">6. Your Rights</h4>
            <p className="text-muted">
              You have the right to access, correct, or delete your personal information. You can also object to the processing of your data or request data portability. To exercise these rights, please contact us using the information provided below.
            </p>

            <h4 className="Urbanist mt-4">7. Changes to This Privacy Policy</h4>
            <p className="text-muted">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of the website after any changes constitutes your acceptance of the revised policy.
            </p>

            <h4 className="Urbanist mt-4">8. Contact Us</h4>
            <p className="text-muted">
              If you have any questions or concerns about this Privacy Policy, please contact us at privacy@eshop.com or call us at +91 12345-67890. We are here to assist you with any privacy-related inquiries.
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PrivacyPolicy;
