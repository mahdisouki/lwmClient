import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import useStore from '../store';
import BlogHeaderImage from "../assets/blogI.png"; // Header banner image
import "../css/BlogDetail.css"
const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleBlog, relatedBlogs, getBlogById, getRelatedBlogs } = useStore();

  useEffect(() => {
    getBlogById(id);
  }, [id]);

  useEffect(() => {
    if (singleBlog && singleBlog.tags[0]) {
      getRelatedBlogs(singleBlog.tags[0]);
    }
  }, [singleBlog]);

  if (!singleBlog) {
    return <Spinner animation="border" />;
  }

  return (
    <Container fluid className="p-0">

      {/* Header Section */}
      <Row
        className="position-relative"
        style={{
          height: '300px',
          backgroundImage: `url(${BlogHeaderImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Col className="d-flex align-items-center justify-content-start ps-5">
          <h1 className="text-white display-4 fw-bold" style={{ zIndex: 2 }}>
            Blog Details
          </h1>
        </Col>
      </Row>

      {/* Blog Details Section */}
      <Container className="py-5">
        <Button
          variant="link"
          onClick={() => navigate(-1)}
          className="mb-4 text-success fw-bold"
        >
          &larr; Back to Blog
        </Button>

        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="p-4 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={singleBlog.image}
                alt={singleBlog.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
              />
              <Card.Body>
                <h2 className="fw-bold text-success mt-3">
                  {singleBlog.title}
                </h2>

                <p className="text-muted">
                  Written by <strong>{singleBlog.author}</strong> |
                  <span className="ms-2">
                    {new Date(singleBlog.createdAt).toLocaleDateString()}
                  </span>
                </p>

                <div
  className="text-muted"
  style={{ textAlign: "justify" }}
  dangerouslySetInnerHTML={{ __html: singleBlog.description }}
/>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Related Blogs Section */}
        <h3 className="mt-5 fw-bold text-center">Related Blogs</h3>

        <Row className="justify-content-center mt-4">
          {relatedBlogs.map((blog) => (
            <Col md={3} key={blog._id} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <Card.Img
                  variant="top"
                  src={blog.image}
                  alt={blog.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                />
                <Card.Body>
                  <h5 className="fw-bold text-success">{blog.title}</h5>
                  <p className="text-muted">
                    {blog.description.substring(0, 100)}...
                  </p>
                  <Link to={`/blogs/${blog._id}`} className="text-success fw-bold">
                    Read More &rarr;
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    </Container>
  );
};

export default BlogDetailPage;
