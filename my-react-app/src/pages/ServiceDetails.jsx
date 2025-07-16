import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form, Card, Spinner } from 'react-bootstrap';
import useStore from '../store';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, singleProduct, addToCart, relatedProducts, additionalProducts, getRelatedProductsByCategory } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [optionError, setOptionError] = useState(false);
  // Carousel state for related products
  const [relatedIndex, setRelatedIndex] = useState(0);
  // Responsive items per slide
  const getItemsPerSlide = () => {
    if (window.innerWidth < 768) return 2;
    return 4;
  };
  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());
  useEffect(() => {
    const handleResize = () => setItemsPerSlide(getItemsPerSlide());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const maxIndex = relatedProducts ? Math.max(0, relatedProducts.length - itemsPerSlide) : 0;
  const handlePrev = () => setRelatedIndex(i => Math.max(0, i - itemsPerSlide));
  const handleNext = () => setRelatedIndex(i => Math.min(maxIndex, i + itemsPerSlide));

  const handleViewProduct = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

  useEffect(() => {
    if (singleProduct && singleProduct.category) {
      getRelatedProductsByCategory(singleProduct.category, singleProduct._id);
    }
  }, [singleProduct]);

  const handleAddToCart = () => {
    if (!selectedOption) {
      setOptionError(true);
      return;
    }
    setOptionError(false);
    addToCart(
      {
        ...singleProduct,
        price: typeof singleProduct.price === 'number' ? singleProduct.price : parseFloat(singleProduct.price.replace('£', '')),
      },
      { position: selectedOption },
      quantity
    );
  };

  if (!singleProduct) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  return (
    <Container fluid className="py-5">
      <Button variant="link" onClick={() => navigate(-1)} className="mb-4 fw-bold" style={{color:"#8dc044"}}>
        &larr; <span style={{color:"#8dc044"}}>Back</span>
      </Button>

      {/* Product Detail Section */}
      <Row className="gx-5 mb-5">
        <Col md={6}>
          <Image src={singleProduct.image} alt={singleProduct.itemName} fluid className="rounded-3 shadow-sm" />
        </Col>

        <Col md={6}>
          <h2 className="fw-bold">{singleProduct.itemName}</h2>
          <h4 className="fw-bold mt-3" style={{color:"#8dc044"}}>£{singleProduct.price.toFixed(2)}</h4>

          <Card className="p-4 shadow-sm border-0 mt-4">
            <h5 className="fw-bold mb-3">Item Position <span className="text-danger">*</span></h5>
            <Form>
              <Form.Check
                type="radio"
                label="Inside the Property Needs Dismantling (+£18.00)"
                name="itemPosition"
                onChange={() => {
                  setSelectedOption('Inside the Property Needs Dismantling (+£18.00)');
                  setOptionError(false);
                }}
              />
              <Form.Check
                type="radio"
                label="Inside the Property No Dismantling (+£6.00)"
                name="itemPosition"
                onChange={() => {
                  setSelectedOption('Inside the Property No Dismantling (+£6.00)');
                  setOptionError(false);
                }}
              />
              <Form.Check
                type="radio"
                label="Outside the Property (+£0.00)"
                name="itemPosition"
                onChange={() => {
                  setSelectedOption('Outside the Property (+£0.00)');
                  setOptionError(false);
                }}
              />
              {optionError && (
                <div className="text-danger mt-2">Please select an item position</div>
              )}
            </Form>
          </Card>

          <div className="d-flex align-items-center mt-4">
            <Button variant="light" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              style={{ width: '80px' }}
              className="mx-2 text-center rounded-pill shadow-sm border-success"
            />
            <Button variant="light" onClick={() => setQuantity(quantity + 1)}>+</Button>

            <Button 
              style={{backgroundColor:"#8dc044"}} 
              variant="success" 
              size="lg" 
              className="rounded-pill px-4 ms-3 llm" 
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </Col>
      </Row>

      {/* Additional Products */}
      {/* <h4 className="fw-bold mb-4">You May Also Include This</h4>
      <Row className="g-4 mb-5">
        {additionalProducts?.map((product, idx) => (
          <Col key={idx} md={4}>
            <Card className="p-3 shadow-sm text-center border-0">
              <Image src={product.image} alt={product.itemName} fluid className="mb-3" />
              <h5>{product.itemName}</h5>
              <p className="text-muted">{product.description}</p>
              <h6 className="text-success fw-bold">£{product.price}</h6>
              <Button variant="outline-success" className="rounded-pill mt-2">View Product</Button>
            </Card>
          </Col>
        ))}
      </Row> */}

      {/* Related Products */}
      <h4 className="fw-bold mb-4">Related Service You Might Book</h4>
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="position-relative mb-5">
          <Button
            variant="light"
            className="position-absolute top-50 start-0 translate-middle-y z-2"
            style={{ left: '-20px' }}
            onClick={handlePrev}
            disabled={relatedIndex === 0}
          >
            <FaChevronLeft size={24} />
          </Button>
          <Row className="g-4 justify-content-center">
            {relatedProducts.slice(relatedIndex, relatedIndex + itemsPerSlide).map((product, idx) => (
              <Col key={idx} xs={6} md={3} className="d-flex">
                <Card className="p-3 shadow-sm text-center border-0 w-100 h-100 d-flex flex-column">
                <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.itemName}
          style={{
            width: 'auto',
            height: '150px',
            objectFit: 'contain',
            margin: '0 auto',
            padding: '10px'
          }}
        />                  <h5>{product.itemName}</h5>
                  <p className="text-muted flex-grow-1">{product.description}</p>
                  <h6 className="text-success fw-bold">£{product.price}</h6>
                  <Button
                    variant="success"
                    className="mt-auto px-3 py-1 rounded-2"
                    style={{
                      backgroundColor: '#94c11f',
                      border: 'none',
                      fontWeight: '500',
                    }}
                    onClick={() => handleViewProduct(product._id)}
                  >
                    View Product
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
          <Button
            variant="light"
            className="position-absolute top-50 end-0 translate-middle-y z-2"
            style={{ right: '-20px' }}
            onClick={handleNext}
            disabled={relatedIndex >= maxIndex}
          >
            <FaChevronRight size={24} />
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ProductDetails;
