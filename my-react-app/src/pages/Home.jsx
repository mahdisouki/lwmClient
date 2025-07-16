import React , {useEffect}from 'react';
import { Container, Row, Col, Button, Carousel, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaRecycle, FaClock, FaPhone, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import '../css/Home.css'; // You'll need to create this CSS file
import ImageR from '../assets/home-banner-right-1.webp';
import ImageS from "../assets/Appliance-Removal.png"
import MyButtonContentSection from '../components/whyChooseUs';
import BlogCarousel from '../components/BlogCarousel';
import useStore from '../store';
import { Link } from 'react-router-dom';
import GoogleI from '../assets/google-review.webp';
import TrustPi from '../assets/trustpilot-logo.webp'
import InstagramSection from '../components/InstagramSection';
import AllServices from '../assets/All-Services.webp'
const Home = () => {
    const { categories, getAllCategories } = useStore();

    useEffect(() => {
      getAllCategories();
    }, []);
    return (
        <div className="App">
             <Row style={{backgroundColor:"white" , padding:"0px" , margin:"0px"}}>
               
                    <Col className='text-md-center' md={"12"}>
                    <img src={GoogleI} alt="" srcset="" style={{borderRight:"1px solid black" , paddingRight:"10px"}}/>
                    
                    <img src={TrustPi} alt="" srcset="" style={{paddingLeft:"10px"}} />
                    </Col>
                  
                    
                </Row>
          {/* Hero Section (Offer Section) */}
          <section className="offer-section   py-5" style={{position: 'relative'}}>
            <Container>
              <Row className="align-items-center">
                <Col md={6} className="text-md-left ">
                  <h3 className="p1">We operate Monday to Saturday.</h3>
                  <h3 className='p1'>We cover all areas within the M25 (London and Greater London).</h3>
                  <h3 className="p1">We can remove items from inside your property.</h3>
                  <div className="d-flex justify-content-center justify-content-md-start">
                    <Link to={"/quote"} className='button-color btn fff'>
                      Request a quote
                    </Link>
                  </div>
                </Col>
                <Col md={6} className="text-right">
                  <img
                    src={ImageR}
                    className="img-fluid"
                    style={{ width: '100%', maxWidth: '437px' }}
                  />
                </Col>
              </Row>
              {/* Social Media Icons Bottom Right Inside Offer Section */}
              <div className="offer-social-icons position-absolute d-flex align-items-center" style={{right: 0, bottom: 0, zIndex: 10, padding: '0 10px 10px 0'}}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/rubbishlovers" className="me-3 offer-social-link"><FaFacebookF size={24} /></a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/rubbishlovers" className="me-3 offer-social-link"><FaLinkedinIn size={24} /></a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/rubbishlovers/" className="offer-social-link"><FaInstagram size={24} /></a>
              </div>
            </Container>
          </section>
    
          {/* Services Section */}
          <Container className="services-section py-5">
            <h2 className="text-center mb-4 py-1">Select Your Unwanted Items:</h2>
            <Row className="justify-content-center py-3">
            <Col xs={6} md={3} className="mb-3">
                <Card as={Link}  to={'/services'} className="text-center service-card">
                  <Card.Body>
                    <img  variant="top" src={AllServices}  /> 
                    <Card.Title >All Services</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              {/* Example Service - You would map these from an array */}
                {categories && categories.map((item)=>(
                    <Col xs={6} md={3} className="mb-3">
                <Card  as={Link}  to={`/services?category=${item._id}`} className="text-center service-card">
                  <Card.Body>
                    <img variant="top" src={item.icon}  /> 
                    <Card.Title >{item.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
                ))}
              
    
           
            </Row>
          </Container>
    
          {/* Why Choose Us Section */}
          <MyButtonContentSection/>
    
          {/* Follow Us Section (Carousel) */}
          <InstagramSection/>
    
          {/* Blog Section (Carousel) */}
          <BlogCarousel/>
        </div>
      );
    }

export default Home;
