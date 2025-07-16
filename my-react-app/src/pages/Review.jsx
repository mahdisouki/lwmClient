import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CustomerReview = () => {
  const { orderId } = useParams(); // ✅ Grab order ID from the route
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async () => {
    if (!rating) return alert("Please select a rating");

    setSubmitting(true);
    try {
      await axios.put(`http://localhost:3000/api/tasks/rate/${orderId}`, {
        clientFeedback:comment,
        clientFeedbackScale:rating,
      });
      alert("Thank you for your feedback!");
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5 text-center">
      <h2 className="mb-4">Customer Review</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>How was your experience?</Form.Label>
          <div className="d-flex justify-content-center">
            {[1, 2, 3, 4, 5].map((val) => (
              <span
                key={val}
                className={`mx-1 fs-4 ${rating >= val ? 'text-warning' : 'text-secondary'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setRating(val)}
              >
                ★
              </span>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="commentBox">
          <Form.Label>Comment:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Leave your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Button
          style={{backgroundColor:"#8dc044"}}
          onClick={submitReview}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default CustomerReview;
