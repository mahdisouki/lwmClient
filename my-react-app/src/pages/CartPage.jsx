import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Form, ListGroup, InputGroup } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import useStore from '../store';
import '../css/CartPage.css';
import {Link} from 'react-router-dom'
const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, subtotal, calculateSubtotal, clearCart } = useStore();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    calculateSubtotal();
  }, [cart]);
  const adjustedSubtotal = subtotal < 30 ? 30 : subtotal;
  const tax = (adjustedSubtotal * 0.2).toFixed(2);
  const total = (adjustedSubtotal - discount + parseFloat(tax)).toFixed(2);

  const applyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(adjustedSubtotal * 0.1);
    } else {
      alert('Invalid Coupon Code');
    }
  };

  return (
    <section className="cart-section" style={{ backgroundColor: '#f5f5f5', padding: '50px 0' }}>
      <Container>
        

        <Row>
          {/* Left Column: Cart Items */}
          <Col md={8}>
            <Card className="p-4 shadow-sm">
              <h5>Shopping Cart</h5>

              <ListGroup variant="flush">
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  cart.map((item, idx) => (
                    <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                        />
                        <div className="ms-3">
                          <h5 className="mb-1">{item.title || item.itemName}</h5>
                          <div className="text-muted">
                            <small>Option: {item.options.position}</small>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center">
                        <span className="me-3">£{item.price}</span>

                        <InputGroup style={{ width: '120px' }}>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateCartQuantity(item._id || item.id, item.options.position, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Form.Control size="sm" value={item.quantity} readOnly style={{ textAlign: 'center' }} />
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateCartQuantity(item._id || item.id, item.options.position, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </InputGroup>

                        <Button
                          variant="danger"
                          size="sm"
                          className="ms-3"
                          onClick={() => removeFromCart(item._id || item.id, item.options.position)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="light" onClick={()=>{clearCart();window.location.reload()}}>
                  Clear Cart
                </Button>
              </div>
            </Card>

            <div className="mt-3 p-3 text-muted small">
              <p>
                <strong>Note:</strong> Items left outside and collected anytime receive a 10% discount.
              </p>
              <p>
                Further charges may apply if more than 2 flights of stairs are involved.
              </p>
              <p className="mt-3">
                We only cover Addresses within the M25 (London and Greater London).
              </p>
              <p>
                <strong>Scheduled Time Advisory:</strong> Chosen time slots are subject to rare adjustments based on your postcode and our team's coverage schedule. We appreciate your understanding and flexibility. In the unlikely event of any changes, we will notify you at least one day prior to the scheduled collection.
              </p>
              <p>
                If there are more than 2 flights of stairs you maybe subject to further charges (depending on difficulty of access), please get in touch if you have any doubts.
              </p>
            </div>
          </Col>

          {/* Right Column: Cart Summary */}
          <Col md={4}>
            {cart.length > 0 && (
              <Card className="p-4 shadow-sm">
                <h5>Cart Totals</h5>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Sub-total</span> <span>£{adjustedSubtotal.toFixed(2)}</span>
                  </ListGroup.Item>
                  {discount > 0 && coupon && (
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Discount</span> <span>£{discount.toFixed(2)}</span>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Tax</span> <span>£{tax}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between fw-bold">
                    <span>Total</span> <span>£{total}</span>
                  </ListGroup.Item>
                </ListGroup>

                <Link to={'/checkout'} style={{backgroundColor:"#263238" , textAlign:"center" , padding:"8px"}} variant="success" className="w-100 mt-3">
                  Proceed to Checkout
                </Link>

                <Form.Control
                  placeholder="Coupon Code"
                  className="mt-3"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button variant="outline-success" className="w-100 mt-2" onClick={applyCoupon}>
                  Apply Coupon
                </Button>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartPage;
