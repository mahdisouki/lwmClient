import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store';
import BlogImg from '../assets/blog-1.webp';

const BlogCarousel = () => {
  const { blogs, getAllBlogs } = useStore();
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const displayCount = screenWidth < 576 ? 1 : screenWidth < 768 ? 2 : 4;

  useEffect(() => {
    // Fetch blogs from API
    getAllBlogs();

    // Update on screen resize for responsiveness
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get only the first few blogs to display
  const displayBlogs = blogs.slice(0, displayCount);

  return (
    <section style={{ backgroundColor: '#8dc044' }}>
      <Container fluid className="blog-section py-5">
        <Row>
          <Col className="text-center mt-4 col-10">
            <h2 className="mb-4 text-white">
              Read Our Blog For Advice And Inspiration
            </h2>
          </Col>
          <Col className="mt-4 col-2 text-end">
            <Button style={{ backgroundColor: '#516e29' , width:'-webkit-fill-available' }} onClick={() => navigate('/blog')}>
              View All
            </Button>
          </Col>
        </Row>

        {blogs.length > 0 ? (
          <Row>
            {displayBlogs.map((item) => (
              <Col xs={12} sm={6} md={3} key={item._id}>
                <Card className="h-100 d-flex flex-column shadow-sm">
                  <Link to={`/BlogDetail/${item._id}`}>
                    <Card.Img
                      variant="top"
                      src={item.image || BlogImg}
                      alt={item.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  </Link>
                  <Card.Body className="d-flex flex-column">
                    <Link to={`/BlogDetail/${item._id}`} className="text-dark fw-bold text-decoration-none">
                      <Card.Title className="text-truncate">{item.title}</Card.Title>
                    </Link>
                    <Card.Text className="text-muted mt-auto">
                      {item.author}
                    </Card.Text>
                    <Card.Text className="text-muted mt-auto">
                      {new Date(item.date).toLocaleDateString()}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row className="justify-content-center mt-5">
            <Spinner animation="border" variant="light" />
          </Row>
        )}
      </Container>
    </section>
  );
};

export default BlogCarousel;
