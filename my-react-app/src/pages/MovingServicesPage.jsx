import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import '../css/MovingServices.css'
import img1 from "../assets/House-Removals.png"
import img2 from "../assets/furniture-large-items-Delivery.png"
import img3 from "../assets/Piano-Transport.png"
import img4 from "../assets/Man-Van-Service.webp"
import img5 from "../assets/Office_Commercial-Removals.webp"
import img6 from "../assets/Fully-Insured.webp"
import img7 from "../assets/No-hidden-costs.webp"
import img8 from "../assets/Flexible-Service.webp"
import img9 from "../assets/Fully-equipped-modern-vehicles.webp"
import img10 from "../assets/Furniture-dismantled-and-reassembled.webp"
import img11 from "../assets/Available-at-short-notice.webp"
import Bg from '../assets/Moving.jpeg'
import axios from 'axios';
import imgCustomMove from '../assets/login.png';

const MovingServicesPage = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    repeatEmail: '',
    pickUpLocation: '',
    dropOffLocation: '',
    pickUpPropertyType: '',
    dropOffPropertyType: '',
    packingRequired: '',
    accessInfo: '',
    extraInfo: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles([...files, ...e.dataTransfer.files]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email !== formData.repeatEmail) {
      alert('Emails do not match!');
      return;
    }
    setSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    files.forEach(file => {
      data.append('files', file);
    });
    try {
      for (let pair of data.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      await axios.post('http://localhost:3000/api/sendMovingQuote', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Quote request sent successfully!');
      setFormData({
        fullName: '',
        contactNumber: '',
        email: '',
        repeatEmail: '',
        pickUpLocation: '',
        dropOffLocation: '',
        pickUpPropertyType: '',
        dropOffPropertyType: '',
        packingRequired: '',
        accessInfo: '',
        extraInfo: '',
      });
      setFiles([]);
    } catch (error) {
      alert('Failed to send quote request.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
        <Row className="position-relative" style={{ height: '300px' ,width:"100%" , margin:"0px" }}>
                <Col className="tit d-flex align-items-center justify-content-start ps-5">
                  <h1 style={{ zIndex: 99, fontWeight: "500" }} className="text-white display-4">
                    Moving Services
                  </h1>
                </Col>
                <img
                  src={Bg}
                  alt="Quotation Banner"
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ objectFit: 'cover' , padding:"0px" , margin:"0px" }}
                />
              </Row>
              <Container fluid >
          
          <Row className="text-center mb-5">
            <Col>
              {/* <h2>Moving Services</h2> */}
            </Col>
          </Row>
    
          <Row className="g-3 justify-content-center mr-10 ml-10">
      <Col xs={12} md={2}>
        <Card onClick={() => document.getElementById('movingForm').scrollIntoView({ behavior: 'smooth' })} className="p-3 shadow-sm text-center h-100 hover-glow" style={{ padding: 0 }}>
          <Card.Body>
            <img src={img1} alt="House Removals" />
            <Card.Title>House Removals</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={2}>
        <Card onClick={() => document.getElementById('movingForm').scrollIntoView({ behavior: 'smooth' })} className="p-3 shadow-sm text-center h-100 hover-glow" style={{ padding: 0 }}>
          <Card.Body>
            <img src={img2} alt="Furniture & Large Items Delivery" />
            <Card.Title>Furniture & Large Items Delivery</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={2}>
        <Card onClick={() => document.getElementById('movingForm').scrollIntoView({ behavior: 'smooth' })} className="p-3 shadow-sm text-center h-100 hover-glow" style={{ padding: 0 }}>
          <Card.Body>
            <img src={img3} alt="Item Transport" />
            <Card.Title>Item Transport</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={2}>
        <Card onClick={() => document.getElementById('movingForm').scrollIntoView({ behavior: 'smooth' })} className="p-3 shadow-sm text-center h-100 hover-glow" style={{ padding: 0 }}>
          <Card.Body>
            <img src={img4} alt="Man & Van Service" />
            <Card.Title>Man & Van Service</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={2}>
        <Card onClick={() => document.getElementById('movingForm').scrollIntoView({ behavior: 'smooth' })} className="p-3 shadow-sm text-center h-100 hover-glow" style={{ padding: 0 }}>
          <Card.Body>
            <img src={img5} alt="Office / Commercial Removals" />
            <Card.Title>Office / Commercial Removals</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    
    
          <Row className="my-5">
            <Col md={6}>
              <h1 style={{fontWeight:"700" , fontSize:"3rem" , lineHeight:2}}>Are You Tired Of The Hassle And Stress That Comes With Moving Or Decluttering?</h1>
              <p>
              Look no further! Our professional removal services are here to make your life easier. Whether you're relocating to a new home or simply need to clear out some space, our experienced team will handle all the heavy lifting, packing, and transportation for you. We take great care in handling your belongings, ensuring their safe arrival to their new destination. With our reliable and efficient service, you can sit back, relax, and leave the hard work to us.
              </p>
              <div className="text-center my-4">
                <img src={imgCustomMove} alt="Moving Service Workers" style={{ maxWidth: '100%', height: 'auto', boxShadow: '0 0 32px #8dc04433', borderRadius: '16px' }} />
              </div>
            </Col>
    
            <Col md={6} id="movingForm">
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Control type="text" name="fullName" placeholder="Full Name*" required value={formData.fullName} onChange={handleChange} />
                  </Col>
                  <Col md={6}>
                    <Form.Control type="text" name="contactNumber" placeholder="Contact Number*" required value={formData.contactNumber} onChange={handleChange} />
                  </Col>
                </Row>
    
                <Form.Group className="mb-3 mt-3">
                  <Form.Control type="email" name="email" placeholder="Email*" required value={formData.email} onChange={handleChange} />
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Control type="email" name="repeatEmail" placeholder="Repeat Email*" required value={formData.repeatEmail} onChange={handleChange} />
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={2} name="pickUpLocation" placeholder="Pick up Location*" required value={formData.pickUpLocation} onChange={handleChange} />
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Select name="pickUpPropertyType" value={formData.pickUpPropertyType} onChange={handleChange} required>
                    <option value="">Property Type at Pick Up Location*</option>
                    <option>House</option>
                    <option>Flat</option>
                    <option>Single Room</option>
                    <option>Studio</option>
                    <option>Storage Unit</option>
                    <option>Business</option>
                  </Form.Select>
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={2} name="dropOffLocation" placeholder="Drop Off Location*" required value={formData.dropOffLocation} onChange={handleChange} />
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Select name="dropOffPropertyType" value={formData.dropOffPropertyType} onChange={handleChange} required>
                    <option value="">Property Type at Drop Off Location*</option>
                    <option>House</option>
                    <option>Flat</option>
                    <option>Single Room</option>
                    <option>Studio</option>
                    <option>Storage Unit</option>
                    <option>Business</option>
                  </Form.Select>
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Label>Is Packing Required?</Form.Label><br />
                  <Form.Check inline label="Yes" type="radio" name="packingRequired" checked={formData.packingRequired === 'Yes'} onChange={() => setFormData({ ...formData, packingRequired: 'Yes' })} />
                  <Form.Check inline label="No" type="radio" name="packingRequired" checked={formData.packingRequired === 'No'} onChange={() => setFormData({ ...formData, packingRequired: 'No' })} />
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={2} name="accessInfo" placeholder="What is access like on both sides?" value={formData.accessInfo} onChange={handleChange} />
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <div
                    className="border p-4 text-center"
                    style={{ borderStyle: 'dashed', cursor: 'pointer' }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    <p>Drag & Drop Files Here</p>
                    <p>or</p>
                    <p>Click to Browse Files</p>
                    <Form.Text>Supported formats: JPG, PNG, GIF, MP4</Form.Text>
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <div className="mt-2">
                    {files.length > 0 && <p>{files.length} file(s) selected.</p>}
                  </div>
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={2} name="extraInfo" placeholder="Extra Info" value={formData.extraInfo} onChange={handleChange} />
                </Form.Group>
    
                <div className="mb-3">
                  <div className="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
                </div>
    
                <Button className='llm' style={{backgroundColor:"#8dc044"}} type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Request Quote'}</Button>
              </Form>
            </Col>
          </Row>
    
          <Row className="py-5  text-center" style={{backgroundColor:"rgb(240, 251, 255)"}}>
            <Col>
              <h3>Why Choose London Removals Team?</h3>
              <Row className="py-5  text-center">
                <Col md={4} xs={6}>
                  <img src={img6}/>
                  <p>Fully Insured</p>
                </Col>
                <Col md={4} xs={6}>
                  <img src={img7}/>
                  <p>No Hidden Costs</p>
                </Col>
                <Col md={4} xs={6}>
                  <img src={img8}/>
                  <p>Flexible Service</p>
                </Col>
                <Col md={4} xs={6}>
                  <img src={img9}/>
                  <p>Fully Equipped Modern Vehicles</p>
                </Col>
                <Col md={4} xs={6}>
                  <img src={img10}/>
                  <p>Furniture Dismantled And Reassembled</p>
                </Col>
                <Col md={4} xs={6}>
                  <img src={img11}/>
                  <p>Available At Short Notice</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
    </section>
  
  );
};

export default MovingServicesPage;
