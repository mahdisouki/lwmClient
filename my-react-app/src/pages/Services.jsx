import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, ListGroup, Pagination, Form } from "react-bootstrap";
import useStore from "../store";
import "../css/Services.css"
import DayCollectionIcon from '../assets/Day-Collection.png';
import CollectionPricesIcon from '../assets/Collection-Prices.png';
import CollectionIndoorsIcon from '../assets/Collection-Indoors.png';

const Services = () => {
  const { categories, products, getAllCategories, getAllProducts , metaa } = useStore();
  const [selectedCategoryName, setSelectedCategoryName] = useState('All Services');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('default');

  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  const totalPages = metaa ? Math.ceil(metaa.total / metaa.limit) : 1;

  // Sort products based on selected option
  const getSortedProducts = () => {
    const sortedProducts = [...products];
    switch (sortOption) {
      case 'name-asc':
        return sortedProducts.sort((a, b) => a.itemName.localeCompare(b.itemName));
      case 'name-desc':
        return sortedProducts.sort((a, b) => b.itemName.localeCompare(a.itemName));
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      default:
        return sortedProducts;
    }
  };

  // Fetch categories and products on load
  useEffect(() => {
    getAllCategories();

    // Get the 'category' from the URL
    const initialCategory = searchParams.get('category');
    const search = searchParams.get('search');
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      const categoryName = categories.find(cat => cat._id === initialCategory)?.name;
      setSelectedCategoryName(categoryName || 'Services');
      getAllProducts(currentPage, productsPerPage, initialCategory, search, sortOption);
    } else {
      getAllProducts(currentPage, productsPerPage, initialCategory, search, sortOption);
    }
  }, [searchParams, currentPage, metaa?.total, sortOption]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    // Update the URL with the selected category
    navigate(`/services?category=${category}`);
    getAllProducts(1, productsPerPage, category, '', sortOption);
  };

  const handleViewProduct = (productId) => {
    navigate(`/product-detail/${productId}`);
  };
  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // This gives a smooth scrolling effect
    });
    setCurrentPage(pageNumber);
   
  };
  
  const selectedCategoryObj = categories.find(cat => cat._id === selectedCategory);

  return (
    <Container fluid className="py-5">
      <Row className="text-center mb-5">
        <Col>
        <h2>{selectedCategoryName}</h2>
        {selectedCategoryObj?.description && (
          <div className="text-muted mb-3" style={{ fontSize: "1.1rem" }}>
            {selectedCategoryObj.description}
          </div>
        )}
        </Col>
      </Row>

      <Row>
      <Col md={3}>
        <h5 className="fw-bold mb-3">Search By Category</h5>
        {/* Responsive: Dropdown for mobile, list for desktop */}
        <div className="d-block d-md-none mb-3">
          <Form.Select
            value={selectedCategory}
            onChange={e => handleCategoryChange(e.target.value)}
            className="category-dropdown"
          >
            <option value="">All</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </Form.Select>
        </div>
        <div className="d-none d-md-block">
          <ListGroup>
            <ListGroup.Item
              action
              active={!selectedCategory}
              onClick={() => handleCategoryChange('')}
              className="d-flex align-items-center category-item"
            >
              <span className="ms-2">All</span>
            </ListGroup.Item>
            {categories.map((category) => (
              <ListGroup.Item
                key={category._id}
                action
                active={selectedCategory === category._id}
                onClick={() => handleCategoryChange(category._id)}
                className="d-flex align-items-center category-item"
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  width="30"
                  height="30"
                  className="me-3"
                  style={{ objectFit: 'contain' }}
                />
                <span className="fw-medium">{category.name}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Col>


        <Col md={9}>
        <Row className="mb-4">
          <Col className="d-flex justify-content-end">
            <Form.Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{ width: 'auto' }}
              className="border-success"
            >
              <option value="default">Sort By</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="g-4">
  {getSortedProducts().map((product) => (
    <Col key={product._id} xs={12} md={4}>
      <Card className="shadow-sm border rounded h-100 p-3" style={{ borderRadius: '10px' }}>
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
        />

        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="fw-bold fs-5 text-center">
            {product.itemName}
          </Card.Title>

          <Card.Text className="text-muted small"
            dangerouslySetInnerHTML={{
              __html: product.description
                ? product.description.replace(/(\\n|\r\n|\r|\n)/g, "<br />")
                : ""
            }}
          />

          <div className="mt-auto border-top pt-2">
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold fs-5">£{product.price.toFixed(2)}</span>
              <Button
                variant="success"
                className="px-3 py-1 rounded-2"
                style={{
                  backgroundColor: '#94c11f',
                  border: 'none',
                  fontWeight: '500',
                }}
                onClick={() => handleViewProduct(product._id)}
              >
                View Product
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

<Pagination className="custom-pagination justify-content-center mt-4">
  <Pagination.Prev 
    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
    disabled={currentPage === 1}
  />

  {[...Array(totalPages)].map((_, index) => (
    <Pagination.Item
      key={index + 1}
      active={index + 1 === currentPage}
      onClick={() => handlePageChange(index + 1)}
    >
      {index + 1}
    </Pagination.Item>
  ))}

  <Pagination.Next
    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
    disabled={currentPage === totalPages}
  />
</Pagination>



        </Col>
      </Row>
      {/* Why Book Your Removal With LWM Section */}
<Container className="text-center my-5">
  <h2 className="mb-5 fw-bold" style={{ fontSize: '2.5rem' }}>Why Book Your Removal With LWM?</h2>
  <Row className="justify-content-center">
    <Col md={4} className="mb-4">
      <img src={DayCollectionIcon} alt="Same/Next Day Collection" style={{ width: 120, height: 120 }} />
      <div className="mt-3" style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>Same/Next Day Collection</div>
    </Col>
    <Col md={4} className="mb-4">
      <img src={CollectionPricesIcon} alt="Fixed Collection Prices" style={{ width: 120, height: 120 }} />
      <div className="mt-3" style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>Fixed Collection Prices</div>
    </Col>
    <Col md={4} className="mb-4">
      <img src={CollectionIndoorsIcon} alt="Collection From Indoors" style={{ width: 120, height: 120 }} />
      <div className="mt-3" style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>Collection From Indoors</div>
    </Col>
  </Row>
</Container>
    </Container>
  );
};

export default Services;
