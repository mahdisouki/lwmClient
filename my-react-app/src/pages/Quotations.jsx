import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Qimg from "../assets/Qimg.png";

const Quotations = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    Town: '',
    RoadName: '',
    DoorNumber: '',
    postcode: '',
    email: '',
    confirmEmail: '',
    comments: '',
  });

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles([...e.dataTransfer.files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('DoorNumber', formData.DoorNumber);
    data.append('RoadName', formData.RoadName);
    data.append('Town', formData.Town);
    data.append('email', formData.email);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('postcode', formData.postcode);
    data.append('comments', formData.comments);
  
    files.forEach((file) => {
      data.append('items', file);
    });
  
    try {
      const response = await axios.post('http://localhost:3000/api/quotation', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Quotation Request Submitted Successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting quotation:', error);
      alert(`Failed to submit quotation request. ${error.message}`);
    }
  };

  return (
    <Container fluid className="p-0" style={{padding:"0px" , margin:"0px"}}>
      <Row className="position-relative" style={{ height: '300px' , padding:"0px" , margin:"0px" }}>
        <Col className="tit d-flex align-items-center justify-content-start ps-5">
          <h1 style={{ zIndex: 99, fontWeight: "500" }} className="text-white display-4">
            Quotation Request
          </h1>
        </Col>
        <img
          src={Qimg}
          alt="Quotation Banner"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
      </Row>

      <Row className="justify-content-center py-5 px-4" style={{padding:"0px" , margin:"0px"}}>
        <Col md={10}>
          <h3 className="fw-bold mb-4">Collection details</h3>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Control name="firstName" onChange={handleChange} placeholder="First name" required className="p-3 rounded-pill" />
              </Col>
              <Col md={6}>
                <Form.Control name="lastName" onChange={handleChange} placeholder="Last name" required className="p-3 rounded-pill" />
              </Col>
              <Col md={12}>
                <Form.Control name="phoneNumber" onChange={handleChange} placeholder="Phone Number*" className="p-3 rounded-pill" />
              </Col>
              <Col md={3}>
                <Form.Control name="DoorNumber" onChange={handleChange} placeholder="Door Number" className="p-3 rounded-pill" />
              </Col>
              <Col md={3}>
                <Form.Control name="RoadName" onChange={handleChange} placeholder="Road Name" className="p-3 rounded-pill" />
              </Col>
              <Col md={3}>
                <Form.Control name="Town" onChange={handleChange} placeholder="Town" className="p-3 rounded-pill" />
              </Col>
              <Col md={3}>
                <Form.Control name="postcode" onChange={handleChange} placeholder="Post Code" className="p-3 rounded-pill" />
              </Col>
              <Col md={6}>
                <Form.Control name="email" onChange={handleChange} placeholder="Email" className="p-3 rounded-pill" />
              </Col>
              <Col md={6}>
                <Form.Control name="confirmEmail" onChange={handleChange} placeholder="Confirm Email" className="p-3 rounded-pill" />
              </Col>
              <Col md={12}>
                <Form.Control as="textarea" name="comments" rows={3} placeholder="Comments" className="p-3 rounded-3" value={formData.comments} onChange={handleChange} />
              </Col>
            </Row>

            <Card
              className="text-center p-4 mt-4 border-0 shadow-sm"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{ border: '2px dashed #ccc', borderRadius: '10px' }}
            >
              <p className="mb-2 fw-bold">Drag & Drop Files Here</p>
              <p className="text-muted">OR</p>
              <Form.Label className="text-success text-decoration-none" style={{ cursor: 'pointer' }}>
                Browse Files
                <Form.Control type="file" multiple accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              </Form.Label>

              {files.length > 0 && (
                <div className="mt-3 d-flex flex-wrap gap-3">
                  {files.map((file, index) => (
                    <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ position: 'absolute', top: '5px', right: '5px', borderRadius: '50%' }}
                        onClick={() => removeFile(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <div className="text-end mt-4">
              <Button variant="success" size="lg" type="submit" className="rounded-pill px-4 py-2 llm ">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Quotations;
