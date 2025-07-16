import React, { useEffect } from 'react';
import { Offcanvas, Button, ListGroup } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import useStore from '../store';
import { Link } from 'react-router-dom';

const Cart = ({ show, handleClose }) => {
  const { cart, removeFromCart, subtotal, calculateSubtotal } = useStore();

  useEffect(() => {
    calculateSubtotal();
    console.log('Cart contents:', cart);
    console.log('Cart length:', cart.length);
  }, [cart]);

  // Ensure minimum subtotal of £30 before VAT
  const adjustedSubtotal = subtotal < 30 ? 30 : subtotal;
  const tax = (adjustedSubtotal * 0.2).toFixed(2);
  const total = (adjustedSubtotal + parseFloat(tax)).toFixed(2);

  return (
    <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ListGroup>
              {cart.map((item, idx) => (
                <ListGroup.Item key={idx} className="d-flex justify-content-between">
                  <div>
                    <img src={item.image} height={"50px"} width={"50px"} alt="product"/>
                    <div className="ms-2 d-inline-block">
                      <h6 className="mb-0">{item.title || item.itemName}</h6>
                      <small>Option: {item.options.position}</small>
                      <div>Unit Price: £{item.price.toFixed(2)}</div>
                      <div>Quantity: {item.quantity}</div>
                      <div>Total: £{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item._id || item.id, item.options.position)}
                  >
                    <Trash size={16} />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="mt-4">
              <h5>Subtotal: £{adjustedSubtotal.toFixed(2)}</h5>
              <h6>VAT (20%): £{tax}</h6>
              <h3>Total: £{total}</h3>
            </div>
          </>
        )}

        <div className="mt-3">
          <Link to={"/services"} onClick={()=>handleClose()} style={{backgroundColor:"#6FBBDB"}} className="btn btn-secondary w-100 mb-2 ool llm">
            Continue Booking
          </Link>
          <Link to={"/cart"} onClick={()=>handleClose()} style={{backgroundColor:"#6FBBDB"}} className="btn w-100 mb-2 ool llm">
            View Cart
          </Link>
          <Link  to={"/checkout"} onClick={()=>handleClose()} style={{backgroundColor:"#8dc044"}} className="btn w-100 mb-2 llmm">
            Proceed To Checkout 
          </Link>
        </div>
      </Offcanvas.Body>
    </>
  );
};

export default Cart;
