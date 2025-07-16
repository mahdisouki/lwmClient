import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Pagination, Spinner } from 'react-bootstrap';
import BlogI from "../assets/blogI.png";
import useStore from '../store';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const {
    blogs,
    tags,
    meta,
    getAllBlogs,
    getAllTags,
    setSearchQuery,
    searchQuery,
  } = useStore();

  const [currentTag, setCurrentTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllTags();
    getAllBlogs(currentPage, 9, currentTag, searchQuery);
  }, [currentPage, currentTag, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTagClick = (tag) => {
    setCurrentTag(tag === 'All' ? '' : tag);
    setCurrentPage(1);
  };

  return (
    <Container fluid className="p-0">
      {/* Header Section */}
      <Row
        className="position-relative"
        style={{
          height: '350px',
          backgroundImage: `url(${BlogI})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          padding:"0px" , margin:"0px"
        }}
      >
        <Col className="tit d-flex align-items-center justify-content-start ps-5">
          <h1 className="text-white display-4 fw-bold" style={{ zIndex: 2 }}>
            Blog
          </h1>
        </Col>
      </Row>

      <Container className="py-5">
        <h2 className="fw-bold mb-4">All Blog Posts</h2>

        {/* Blog Categories */}
        <div className="d-flex flex-wrap gap-3 mb-4">
          <Button variant={currentTag === '' ? 'success' : 'outline-success'} className="rounded-pill px-3 py-1" onClick={() => handleTagClick('All')}>
            All
          </Button>
          {tags.map((tag, idx) => (
            <Button
              key={idx}
              variant={currentTag === tag ? 'success' : 'outline-success'}
              className="rounded-pill px-3 py-1"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Search Input */}
        <Form className="d-flex mb-5">
          <Form.Control
            type="text"
            placeholder="Search blog articles"
            className="p-3 rounded-pill shadow-sm"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Form>

        {/* Blog Cards */}
        <Row className="g-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Col md={6} key={blog._id}>
                <Card className="p-4 shadow-sm border-0 h-100">
                  <Row className="g-3 align-items-center h-100">
                    <Col md={4}>
                      <Card.Img
                        variant="top"
                        src={blog.image}
                        alt={blog.title}
                        className="rounded-3"
                        style={{
                          height: '150px',
                          width: '100%',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
                      />
                    </Col>
                    <Col md={8}>
                      <h5 className="fw-bold text-success">{blog.title}</h5>
                      <div
  className="text-muted"
  style={{ fontSize: "0.9rem" }}
  dangerouslySetInnerHTML={{
    __html: blog.description.length > 100
      ? `${blog.description.substring(0, 100)}...`
      : blog.description
  }}
></div>
                      <p className="small text-muted">
                        {new Date(blog.date).toLocaleDateString()}
                      </p>
                      <Link to={`/BlogDetail/${blog._id}`} className="text-success fw-bold">
                        Read More &rarr;
                      </Link>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <Spinner animation="border" variant="success" />
              <p className="mt-3">No blogs found.</p>
            </Col>
          )}
        </Row>

        {/* Pagination */}
        <Pagination className="justify-content-center mt-5">
          {Array.from({ length: Math.ceil(meta.total / meta.limit) }).map((_, idx) => (
            <Pagination.Item
              key={idx}
              active={currentPage === idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              style={{backgroundColor:" green !important" , color:"white"}}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </Container>
  );
};

export default BlogPage;
