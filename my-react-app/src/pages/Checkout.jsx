import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Alert,
  Spinner,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import BlogI from "../assets/blogI.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Checkout = () => {
  const { cart, subtotal, clearCart, calculateSubtotal } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    calculateSubtotal();
    console.log('cart:', cart, 'subtotal:', subtotal);
  }, [cart]);

  const adjustedSubtotal = subtotal < 30 ? 30 : subtotal;
  const tax = (adjustedSubtotal * 0.2).toFixed(2);
  const total = (adjustedSubtotal + parseFloat(tax)).toFixed(2);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    phoneNumber2: "",
    email: "",
    additionalNotes:"",
    confirmEmail: "",
    businessName: "",
    available: "AnyTime",
    location: {
      coordinates: [],
    },
    date: "",
    collectionAddress: "",
    billingAddress: "",
    postcode: "",
    paymentStatus: "Unpaid",
    clientObjectPhotos: [],
    paymentMethod: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [files, setFiles] = useState([]);
  const [paymentAmountType, setPaymentAmountType] = useState('full');
  const depositAmount = 36;
  const amountToPay = paymentAmountType === 'deposit' ? depositAmount : Number(total);
  const [emailError, setEmailError] = useState("");
  const [validated, setValidated] = useState(false);
  const [blockedDays, setBlockedDays] = useState([]);
  const [datePickerDate, setDatePickerDate] = useState(null);

  // UK postcode regex
  const ukPostcodeRegex = /^([A-Z]{1,2}[0-9][0-9A-Z]? ?[0-9][A-Z]{2})$/i;

  // Format postcode as user types
  const handlePostcodeChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    // Insert space before last 3 characters if not already present
    if (value.length > 3) {
      value = value.slice(0, value.length - 3) + ' ' + value.slice(value.length - 3);
    }
    setFormData((prevData) => ({ ...prevData, postcode: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setFormData((prev) => ({
      ...prev,
      clientObjectPhotos: selectedFiles,
    }));
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    setFormData((prev) => ({
      ...prev,
      clientObjectPhotos: droppedFiles,
    }));
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, clientObjectPhotos: files }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handlePostcodeLookup = async () => {
    const postcode = formData.postcode?.trim();
    if (!postcode) return;

    try {
      const res = await axios.get(
        `https://api.ideal-postcodes.co.uk/v1/addresses?api_key=ak_ma0z4fvyZQYl8mKxJTQvbPYVVrExS&postcode=${postcode}`
      );

      const hits = res.data?.result?.hits || [];

      if (hits.length > 0) {
        setSuggestions(hits);
        setError("");
      } else {
        setSuggestions([]);
        setError("No addresses found for this postcode.");
      }
    } catch (err) {
      console.error("API error:", err);
      setSuggestions([]);
      setError("Failed to fetch address suggestions.");
    }
  };

  const handleCopyAddress = () => {
    setFormData((prev) => ({ ...prev, billingAddress: prev.collectionAddress }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setValidated(true);
    setError("");
    setEmailError("");
    const form = document.getElementById('checkout-form');
    if (form && !form.checkValidity()) {
      setLoading(false);
      return;
    }
    if (formData.email !== formData.confirmEmail) {
      setEmailError("Email and Confirm Email do not match.");
      setLoading(false);
      return;
    }
    setLoading(true);
    console.log(formData)
    try {
      const standardItems = cart.map((item) => ({
        standardItemId: item.id,
        quantity: item.quantity,
        Objectsposition: item.options.position,
      }));

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "clientObjectPhotos" && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            data.append("clientObjectPhotos", value[i]);
          }
        } else if (key === "location") {
          data.append("location", JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });
      data.append("standardItems", JSON.stringify(standardItems));
      data.append('paymentAmountType', paymentAmountType);
      data.append('paidAmount', JSON.stringify({ value: amountToPay, currency: 'GBP' }));
      data.append('additionalNotes', formData.additionalNotes || '');

      const taskRes = await axios.post(
        "http://localhost:3000/api/create-request",
        data
      );
      const taskId = taskRes.data.task._id;

      const paymentRes = await axios.post(
        `http://localhost:3000/api/task/pay/${taskId}`,
        {
          paymentType: formData.paymentMethod,
        }
      );

      if (formData.paymentMethod === "stripe") {
        window.location.href = paymentRes.data.redirectUrl;
      } else if (formData.paymentMethod === "paypal") {
        window.location.href = paymentRes.data.approvalLink;
      }

      clearCart();
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during the checkout."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/blockingDays/blocking-days')
      .then(res => {
        // Normalize date to YYYY-MM-DD
        const normalized = (res.data.blockingDays || []).map(day => ({
          ...day,
          date: day.date.split('T')[0]
        }));
        setBlockedDays(normalized);
      })
      .catch(err => {
        console.error('Failed to fetch blocking days', err);
      });
  }, []);

  const isBlocked = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return blockedDays.some(day => day.date === dateStr);
  };
  const getBlockReason = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const found = blockedDays.find(day => day.date === dateStr);
    return found ? found.type : '';
  };

  return (
    <Container fluid className="p-0">
      <Row className="position-relative" style={{ height: "300px" }}>
        <Col className="d-flex align-items-center justify-content-start ps-5">
          <h1
            style={{ zIndex: 99, fontWeight: "500" }}
            className="text-white display-4"
          >
            Checkout
          </h1>
        </Col>
        <img
          src={BlogI}
          alt="Quotation Banner"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </Row>
     

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="justify-content-center py-5 px-4" style={{ margin: 0 }}>
        <Col md={6}>
          <h4>Collection Details</h4>
          <Form id="checkout-form" noValidate validated={validated}>
            {/* First Name */}
            <Form.Group className="mb-3">
              <Form.Label>FIRST NAME</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          
            {/* Last Name */}
            <Form.Group className="mb-3">
              <Form.Label>LAST NAME</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
              {/* Business Name */}
              <Form.Group className="mb-3">
              <Form.Label>BUSINESS NAME (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Phone Number */}
            <Form.Group className="mb-3">
              <Form.Label>PHONE NUMBER</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            {/* Phone Number 2 (optional) */}
            <Form.Group className="mb-3">
              <Form.Label>PHONE NUMBER 2 (optional)</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber2"
                value={formData.phoneNumber2}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            {/* Confirm Email */}
            <Form.Group className="mb-3">
              <Form.Label>CONFIRM EMAIL</Form.Label>
              <Form.Control
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                required
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
            </Form.Group>
            {/* Postcode with Lookup */}
            <Form.Group className="mb-3">
              <Form.Label>POSTCODE</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handlePostcodeChange}
                  isInvalid={formData.postcode && !ukPostcodeRegex.test(formData.postcode)}
                  required
                />
                <Button variant="secondary" onClick={handlePostcodeLookup}>
                  Lookup
                </Button>
              </div>
              {formData.postcode && !ukPostcodeRegex.test(formData.postcode) && (
                <Form.Control.Feedback type="invalid" style={{display:'block'}}>
                  Please enter a valid UK postcode (e.g. SW1A 1AA)
                </Form.Control.Feedback>
              )}
            </Form.Group>
            {/* Address Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <Form.Group className="mb-3">
                <Form.Label>Select Your Address</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    const selected = suggestions.find(
                      (s) => String(s.udprn) === e.target.value
                    );
                    if (selected) {
                      const addressString = `${selected.line_1}${selected.line_2
                        ? ", " + selected.line_2
                        : ""
                        }, ${selected.post_town}`;
                      const today = new Date().toISOString().split("T")[0];
                      setFormData((prev) => ({
                        ...prev,
                        collectionAddress: addressString,
                        location: {
                          coordinates: [selected.longitude, selected.latitude],
                        },
                        date: today,
                      }));
                    }
                  }}
                >
                  <option value="">-- Select an address --</option>
                  {suggestions.map((addr) => (
                    <option key={addr.udprn} value={addr.udprn}>
                      {addr.line_1}
                      {addr.line_2 ? ", " + addr.line_2 : ""}, {addr.post_town}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
            {/* Collection Address */}
            <Form.Group className="mb-3">
              <Form.Label>COLLECTION ADDRESS</Form.Label>
              <Form.Control
                type="text"
                name="collectionAddress"
                value={formData.collectionAddress}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            {/* Billing Address with Copy Button */}
            <Form.Group className="mb-3">
              <Form.Label>BILLING ADDRESS</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  required
                />
                <Button variant="outline-secondary" type="button" onClick={handleCopyAddress} style={{whiteSpace:'nowrap'}}>Copy from Collection</Button>
              </div>
            </Form.Group>

            {/* Additional Notes */}
            <Form.Group className="mb-3">
              <Form.Label>ADDITIONAL NOTES (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Enter any additional information or special instructions..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Object Photos (Optional)</Form.Label>
              <div
                className="border rounded p-4 text-center"
                style={{ borderStyle: "dashed", cursor: "pointer", background: "#f9f9f9" }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <p className="mb-1">📂 Drag & Drop Files Here</p>
                <p className="mb-1">or</p>
                <p className="fw-bold">Click to Browse Files</p>
                <Form.Text className="text-muted">Supported formats: JPG, PNG, GIF, MP4</Form.Text>
              </div>

              <input
                type="file"
                id="fileInput"
                multiple
                accept="image/*,video/mp4"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              <div className="mt-3">
                {files.length > 0 && (
                  <div className="d-flex flex-wrap gap-3">
                    {files.map((file, index) => (
                      <div key={index} style={{ width: "100px" }}>
                        {file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            className="img-fluid rounded"
                          />
                        ) : (
                          <video
                            src={URL.createObjectURL(file)}
                            controls
                            className="img-fluid rounded"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>
          </Form>
        </Col>

        <Col md={6}>
          <h4>Your Order</h4>
          {cart.length > 0 && (
            <ListGroup>
              {cart.map((item, idx) => (
                <ListGroup.Item key={idx} className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.title || item.itemName}
                    style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '15px' }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.title || item.itemName}</h6>
                    <div className="text-muted">
                      <small>Option: {item.options.position}</small>
                    </div>
                    <div>£{item.price} x {item.quantity}</div>
                  </div>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <strong>Subtotal:</strong> £{adjustedSubtotal.toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>VAT (20%):</strong> £{(adjustedSubtotal * 0.2).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Total:</strong> £{total}
              </ListGroup.Item>
            </ListGroup>
          )}

          <div className="mt-4 p-3">
            
            <Form.Group className="mb-3">
              <Form.Label>Collection Date</Form.Label>
              <DatePicker
                selected={datePickerDate}
                onChange={date => {
                  setDatePickerDate(date);
                  setFormData(prev => ({ ...prev, date: date ? date.toISOString().split('T')[0] : '' }));
                }}
                minDate={new Date()}
                filterDate={date => !isBlocked(date)}
                placeholderText="Select a date"
                className="form-control"
                dateFormat="yyyy-MM-dd"
                customInput={
                  <Form.Control type="text" />
                }
                renderDayContents={(day, date) => {
                  if (isBlocked(date)) {
                    return (
                     
                        <span style={{ color: 'red', textDecoration: 'line-through', cursor: 'not-allowed' }}>{day}</span>
                     
                    );
                  }
                  return <span>{day}</span>;
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Available Time</Form.Label>
              <Form.Select
                name="available"
                onChange={handleInputChange}
                value={formData.available}
              >
                <option value="AnyTime">AnyTime : (06:30am-8:30pm)</option>
                <option value="7am-12pm">Morning : (07:00am-12:00pm)</option>
                <option value="12pm-5pm">Evening : (12:00pm-5:00pm)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                name="paymentMethod"
                onChange={handleInputChange}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="stripe">CREDIT/DEBIT CARD</option>
                <option value="paypal">PayPal</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              
              {Number(total) > 36 && (
                <>
                <Form.Label>Payment Amount</Form.Label>
                  <Form.Check
                    type="radio"
                    label={`Pay Deposit (£${depositAmount})`}
                    name="paymentAmountType"
                    value="deposit"
                    checked={paymentAmountType === 'deposit'}
                    onChange={() => setPaymentAmountType('deposit')}
                  />
                  <Form.Check
                    type="radio"
                    label={`Pay Full Amount (£${total})`}
                    name="paymentAmountType"
                    value="full"
                    checked={paymentAmountType === 'full'}
                    onChange={() => setPaymentAmountType('full')}
                  />
                </>
              )}
            </Form.Group>
          </div>

          <Button
            className="mt-4 llm d-block mx-auto"
            variant="success"
            onClick={handleSubmit}
            disabled={loading}
            style={{ minWidth: 220 }}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Confirm Order & Pay"
            )}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
