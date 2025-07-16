import React , {useEffect} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaFacebookF, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaComments, FaPoundSign } from "react-icons/fa";
import '../css/Footer.css'
import FooterI from '../assets/Footer.png'
import { Link } from "react-router-dom";
import useStore from '../store';

const Footer = () => {
  const { categories, getAllCategories } = useStore();

  useEffect(() => {
    getAllCategories(); // Fetch categories when the footer is mounted
  }, []);

    // Divide categories into two halves for two columns
    const midpoint = Math.ceil(categories?.length / 2);
    const firstHalf = categories?.slice(0, midpoint);
    const secondHalf = categories?.slice(midpoint);
  return (
    <footer className="footer  text-light ">
      <Container  style={{backgroundColor:"#243037" , maxWidth:"100%"}} >
       <Row style={{margin:0 , padding:0 , width:"100%"}}  >
            <Col md={6} style={{display:'flex',textAlign:'center' , alignItems:'center' , flexDirection:'column' , justifyContent:'center' , padding:0}} className="text-center">
             
              <Form className="d-flex justify-content-center">
              <a href="tel:+442030971517" className="lin butta" style={{backgroundColor:"#8dc044", border:'none', margin:'3px', borderRadius:"15px", padding:"25px 30px", color:"white", textDecoration:"none"}}>
                <FaPhoneAlt  className="me-2 threeBtns" /> Call us now
              </a>
                <Link className="lin butta" to={'/Quote'} style={{backgroundColor:"#8dc044", border:'none', margin:'3px', borderRadius:"15px", padding:"25px 30px", color:"white", textDecoration:"none"}}>
                  <FaPoundSign  className="me-2 threeBtns" /> Request a quote
                </Link>
                <Button className="lin butta" style={{backgroundColor:"#8dc044", border:'none', margin:'3px', borderRadius:"15px", padding:"25px 30px", color:"white"}} onClick={() => window.Tawk_API && window.Tawk_API.maximize()}>
                  <FaComments  className="me-2 threeBtns" /> Live chat
                </Button>
              </Form>
            </Col>
            <Col style={{backgroundImage:`url(${FooterI})` , backgroundSize:'cover' , height:"450px" , padding:0}} md={6}>
            
            </Col>
          </Row>
          </Container>
      <Container style={{backgroundColor:'#8dc044'}}>
     
        <Row className="mb-4">
          <Col md={4}>
          <h5>Product Categories</h5>
          <ul className="list-unstyled">
                  {firstHalf?.map((category) => (
                    <li key={category._id}>
                      <Link className="linn" to={`/services?category=${category._id}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
          </Col>

          <Col md={4}>
            <h5>Services</h5>
            <ul className="list-unstyled">
                  {secondHalf?.map((category) => (
                    <li key={category._id}>
                      <Link className="linn" to={`/services?category=${category._id}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
          </Col>

          <Col md={4}>
            <h5>Contact Us</h5>
            <p>
              <FaPhone /> Call us: <a href="tel:+442030971517" className="text-decoration-underline  linn">020 30971517</a>
            </p>
            <p>
              <FaEnvelope style={{width:"20px" , height:"20px"}} /> Email us: <a href="mailto:hello@londonwastemanagement.com" className="text-decoration-underline text-white linn">hello@londonwastemanagement.com</a>
            </p>
            <Link className="fbut mb-4 d-inline-block" to={'/quote'}>📄 Get a quote</Link>
            <div className="social-icons mt-1">
              <a target="_blank" href="https://www.facebook.com/rubbishlovers"><FaFacebookF  size={20} className="me-2" /></a>
              <a target="_blank" href="https://www.linkedin.com/company/rubbishlovers"><FaLinkedinIn size={20} className="me-2" /></a>
              <a target="_blank" href="https://www.instagram.com/rubbishlovers/"><FaInstagram size={20} /></a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={6}>
            <p>Environment Agency Registered Waste Carrier: CBDU308350</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>
              <Link to={'/terms-conditions'} href="#" className="linn me-3">Terms & Conditions</Link>
              <Link to={'/privacy-policy'} href="#" className="linn">Privacy Policy</Link>
            </p>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; 2025 London Waste Management. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
