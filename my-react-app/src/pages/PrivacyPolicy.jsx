import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../css/Privacy.css"; // Custom styles

const PrivacyPolicy = () => {
  return (
    <Container fluid className="privacy-container">
      {/* Header */}
      <Row className="privacy-header text-center py-5">
        <Col>
          <h1>Privacy Policy</h1>
        </Col>
      </Row>

      {/* Content Section */}
      <Container className="privacy-content py-4">
        <h2>Who we are</h2>
        <p>
          Our website address is: <strong>https://www.londonwastemanagement.com</strong>
        </p>

        <h2>Comments</h2>
        <p>
          When visitors leave comments on the site, we collect the data shown in the comments form, as well as the visitor’s IP address and browser user agent string to help with spam detection.
        </p>

        <h2>Media</h2>
        <p>
          If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS).
        </p>

        <h2>Cookies</h2>
        <p>
          If you leave a comment, you may opt-in to saving your name, email, and website in cookies for convenience. These cookies will last for one year.
        </p>

        <h2>Embedded Content</h2>
        <p>
          Articles on this site may include embedded content (e.g. videos, images, articles, etc.) which behave as if the visitor had visited another site.
        </p>

        <h2>Who we share your data with</h2>
        <p>
          If you request a password reset, your IP address will be included in the reset email.
        </p>

        <h2>How long we retain your data</h2>
        <p>
          If you leave a comment, the comment and its metadata are retained indefinitely.
        </p>

        <h2>What rights you have over your data</h2>
        <p>
          If you have an account, you can request an exported file of the personal data we hold, including data you provided.
        </p>

        <h2>Where we send your data</h2>
        <p>
          Visitor comments may be checked through an automated spam detection service.
        </p>
      </Container>

      
    </Container>
  );
};

export default PrivacyPolicy;
