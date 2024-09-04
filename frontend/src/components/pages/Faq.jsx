import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import "./Faq.css";
function Faq() {
  const [activeKey, setActiveKey] = useState(null);
  const handleSelect = (eventKey) => {
    setActiveKey(eventKey === activeKey ? null : eventKey);
  };
  return (
    <>
      <div className="container-fluid bg-single-product py-5">
        <div>
          <h5 className="text-center Urbanist  mt-5">HOME / FAQ's</h5>
        </div>
      </div>

      <div className="container my-4">
        <h3 className="Urbanist mb-3 text-decoration-underline"> What People Normally Asks ?</h3>
        <Accordion activeKey={activeKey} onSelect={handleSelect}>
          <Accordion.Item eventKey="0">
            <Accordion.Header
              className={`accordion-header ${
                activeKey === "0" ? "accordion-active" : ""
              }`}
            >
              <h5 className="syne">
                What is the process for becoming a seller on your platform?
              </h5>
            </Accordion.Header>
            <Accordion.Body className="sora text-muted">
              To become a seller, simply sign up on our platform, complete the
              seller registration form, and provide necessary documentation.
              Once your account is reviewed and approved, you can start listing
              your products and managing your store.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header
              className={`accordion-header ${
                activeKey === "1" ? "accordion-active" : ""
              }`}
            >
              <h5 className="syne">
                How can buyers place an order on your website?
              </h5>
            </Accordion.Header>
            <Accordion.Body className="sora text-muted">
              Buyers can browse through various products, add their desired
              items to the cart, and proceed to checkout. They will need to
              provide shipping information and payment details to complete the
              purchase.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header
              className={`accordion-header ${
                activeKey === "2" ? "accordion-active" : ""
              }`}
            >
              <h5 className="syne">What payment methods are accepted?</h5>
            </Accordion.Header>
            <Accordion.Body className="sora text-muted">
              We accept multiple payment methods including credit/debit cards,
              net banking, and popular digital wallets. For more details, please
              check the payment options available during checkout.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header
              className={`accordion-header ${
                activeKey === "3" ? "accordion-active" : ""
              }`}
            >
              <h5 className="syne">How do I track my order?</h5>
            </Accordion.Header>
            <Accordion.Body className="sora text-muted">
              Once your order is shipped, you will receive a tracking number via
              email or SMS. You can use this number to track your order status
              on our website or through the carrier's tracking system.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header
              className={`accordion-header ${
                activeKey === "4" ? "accordion-active" : ""
              }`}
            >
              <h5 className="syne">What is your return and refund policy?</h5>
            </Accordion.Header>
            <Accordion.Body className="sora text-muted">
              We offer a 30-day return policy on most items. If you are not
              satisfied with your purchase, you can request a return through
              your account, and we will guide you through the process. Refunds
              are processed once the returned item is received and inspected.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header
              className={`accordion-header ${
                activeKey === "5" ? "accordion-active" : ""
              }`}
            >
              <h5 className="syne">How can I contact customer support?</h5>
            </Accordion.Header>
            <Accordion.Body className="sora text-muted">
              For any inquiries or support, you can contact us via the contact
              form on our website, email us at support@eshop.com, or call our
              customer service hotline at +91 12345-67890. We're here to assist
              you with any issues or questions.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default Faq;
