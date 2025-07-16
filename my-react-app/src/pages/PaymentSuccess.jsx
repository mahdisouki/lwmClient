import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner, Container, Alert, Button } from "react-bootstrap";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");
  const paymentIntentId = searchParams.get("payment_intent");
  
  useEffect(() => {
    const confirmPayment = async () => {
      try {
        if (paymentIntentId && sessionId) {
          const response = await axios.post(
            "http://localhost:3000/api/task/confirm-stripe-payment",
            {
              paymentIntentId: paymentIntentId,
              sessionId: sessionId,
            }
          );
          setMessage(response.data.message || "Payment confirmed successfully!");
          setStatus("success");
        } else {
          setStatus("error");
          setMessage("No session ID or payment intent found for payment confirmation.");
        }
      } catch (error) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Payment confirmation failed.");
      }
    };
  
    confirmPayment();
  }, [paymentIntentId, sessionId]);

  // Google Analytics purchase event
  useEffect(() => {
    if (status === "success" && window.gtag) {
      // Try to get cart and total from localStorage
      let cart = [];
      let total = undefined;
      try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      } catch (e) {}
      window.gtag('event', 'purchase', {
        transaction_id: sessionId || paymentIntentId,
        value: total,
        currency: 'GBP',
        items: cart.map(item => ({
          id: item._id || item.id,
          name: item.title || item.itemName,
          price: item.price,
          quantity: item.quantity,
        })),
      });
    }
  }, [status, sessionId, paymentIntentId]);

  return (
    <Container className="py-5 text-center">
      {status === "loading" && <Spinner animation="border" variant="success" />}

      {status === "success" && (
        <Alert variant="success" className="p-4">
          <h2>🎉 Payment Successful!</h2>
          <p>{message}</p>
          <Button as={Link} to="/" variant="success" className="mt-3">
            Go to Home
          </Button>
        </Alert>
      )}

      {status === "error" && (
        <Alert variant="danger" className="p-4">
          <h2>❌ Payment Failed</h2>
          <p>{message}</p>
          <Button onClick={() => navigate(-1)} variant="danger" className="mt-3">
            Try Again
          </Button>
        </Alert>
      )}
    </Container>
  );
};

export default PaymentSuccess;
