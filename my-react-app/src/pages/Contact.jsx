import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CircleBg from "../assets/Ellipse 2@2x.png";
import LinesBg from "../assets/Group 4.png";
import WorkerImage from "../assets/engineer-green-uniform-helmet-showing-right-side 1@2x.png";
import WorkerImageMobile from '../assets/WorkerMob.png'
import MapImage from "../assets/🌎 Map Maker_ London, Greater London, England, United Kingdom (Apple Maps-esque).png";
import "../css/Contact.css";
import { Link } from 'react-router-dom';
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import RecycleIllustration from '../assets/aim-1.webp';

const ContactPage = () => {
  return (
    <Container  fluid >

      <h1 className="fw-bold text-center mt-4 mb-2">Contact Us</h1>
      <p className="text-center mb-4">
        Have a question or need help? Reach out to our team and we'll get back to you as soon as possible.
      </p>

      {/* Mobile Contact Info - visible only on mobile */}
      <div className="contact-info-top d-block d-md-none text-center py-3">
        <div className="fw-bold mb-2" style={{fontSize:'1.2rem'}}>Always Prepared</div>
        <div className="mb-2">You can count on us to be professional, timely, efficient and to make sure you're satisfied every step of the way.</div>
        <div className="mb-1"><strong>Call us</strong> <a href="tel:+442030971517" className="text-decoration-underline text-black">020 30971517</a></div>
        <div className="mb-1"><strong>Email</strong> <a href="mailto:hello@londonwastemanagement.com" className="text-decoration-underline text-black">hello@londonwastemanagement.com</a></div>
        <div><strong>Request a quote</strong> <Link to="/quote" className="text-decoration-underline text-black">online</Link>.</div>
      </div>

      {/* Header Section */}
      <Row className="d-flex flex-column-reverse flex-md-row" style={{ backgroundColor: "#f3f3f3", padding: "5rem 2rem" , borderRadius:"15px" }}>
        
        {/* Circle Background */}
        <img 
          src={CircleBg} 
          alt="Circle Background" 
          className="position-absolute start-0 top-0 translate-middle" 
          style={{ width: '35%', zIndex: 1, left: '10%', top: '10%' }} 
        />

        {/* Lines Background */}
        <img 
          src={LinesBg} 
          alt="Lines Background" 
          className="position-absolute " 
          style={{ width: '25%',  right: '-1%', bottom: '-15%' }} 
        />
<Col md={2} className="text-black d-none d-md-flex" style={{zIndex:99 , alignItems:'flex-start' , justifyContent:'center', verticalAlign:'center',flexDirection:'column' ,padding:0 }}>
  <div className="mb-3 text-start" style={{maxWidth:'400px'}}>
    <div className="fw-bold mb-2" style={{fontSize:'1.2rem'}}>Always Prepared</div>
    <div className="mb-2">You can count on us to be professional, timely, efficient and to make sure you're satisfied every step of the way.</div>
    <div className="mb-1"><strong>Call us</strong> <a href="tel:+442030971517" className="text-decoration-underline text-black">020 30971517</a></div>
    <div className="mb-1"><strong>Email</strong> <a href="mailto:hello@londonwastemanagement.com" className="text-decoration-underline text-black">hello@londonwastemanagement.com</a></div>
    <div><strong>Request a quote</strong> <Link to="/quote" className="text-decoration-underline text-black">online</Link>.</div>
  </div>
</Col>
        {/* Text Section */}
        <Col md={5} className="d-flex flex-column justify-content-center" style={{ zIndex: 2 }}>
        <img src={WorkerImage} alt="Worker" className="img-fluid position-relative d-none d-md-block" style={{ left: "20%", width: "100%" }} />

          {/* Mobile Image */}
          <img src={WorkerImageMobile} alt="Worker Mobile" className="img-fluid d-block d-md-none" style={{ width: "90%" }} />          
        
        </Col>

        {/* Worker Image */}
        <Col md={3}>
          <h5 className="fw-bold mb-3">Head Office</h5>
          <div style={{width:"100%",height:"100%",zIndex:10}}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4966.4829192046645!2d-0.436909!3d51.50878600000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876738f135d00e1%3A0xa48782d08662b977!2sLondon%20Waste%20Management!5e0!3m2!1sen!2sin!4v1741915984863!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 ,borderRadius:"15px"}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="London Waste Management Location"
            ></iframe>
          </div>
        </Col>
      </Row>

{/* Service Area Section */}
<Row className="py-4 text-center" style={{ backgroundColor: "#60b2d3", borderRadius: "15px", color: "white" , margin: "2rem 0"  }}>
  <Col>
    <h3 className="fw-bold">Service area</h3>
    <p>
      We offer our domestic and commercial services to all areas that are situated within the M25.<br/>
      This means we cover ALL of London and Greater London.<br/>
      If you are unsure, <a href="mailto:hello@londonwastemanagement.com" className="get-in-touch-link">just get in touch</a> to check you are within our service area.
    </p>
  </Col>
</Row>     

      {/* Remove. Recycle. Upcycle. Section */}
<Row className="py-5" style={{ backgroundColor: "#f3f3f3", borderRadius: "15px", margin: "2rem 0" }}>
  <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
    <div className="text-start w-100 mb-3">
      <span style={{ color: "#8dc044", fontWeight: 700, letterSpacing: 1 }}>OUR AIM</span>
      <h1 className="fw-bold mt-2" style={{ fontSize: '2.8rem', lineHeight: 1.1 }}>
        Remove.<br />Recycle. Upcycle.
      </h1>
    </div>
    <img
      src={RecycleIllustration} // Replace with your actual asset path
      alt="Recycle Illustration"
      className="img-fluid"
      style={{ maxHeight: "300px" }}
    />
  </Col>
  <Col md={6}>
    <h2 className="fw-bold text-dark">We <span style={{ color: "#8dc044" }}>Remove Waste Safely</span> And <span style={{ color: "#8dc044" }}>Responsibly</span></h2>
    <p className="text-muted mt-3">
      Our aim is to recycle items we collect and, wherever possible, to offer opportunities for upcycling projects. We ensure that any items that can't be recycled or upcycled are processed so that the bare minimum is sent to landfill sites.
    </p>
    <p className="text-muted">
      Our responsibility towards our customers and the environment means that we only use licensed commercial disposal facilities for the waste that we cannot reuse. In line with best practice, London Waste Management documents all waste that is removed, recycled, or upcycled.
    </p>
    <ul className="list-unstyled mt-3">
      <li>✅ Reliable Service</li>
      <li>✅ Book Securely Online</li>
    </ul>
  </Col>
</Row>




    </Container>
  );
};

export default ContactPage;
