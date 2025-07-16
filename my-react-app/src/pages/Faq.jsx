import { Container, Row, Col, Accordion, Card, Button, Form } from 'react-bootstrap';
import Image from "../assets/faq_bg.jpeg"
import { useState } from 'react';
const Faq = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (key) => {
    setActiveItem(key);
  };
  return (
    <Container fluid className="faq-section">
      {/* FAQ Header Section */}
      <Row 
        className="faq-header tit bg-success text-white text-center py-5"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '350px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1
          }}
        />
        <h1 style={{ position: 'relative', zIndex: 2, fontSize: '3rem' }}>FAQ</h1>
      </Row>

      {/* FAQ Section */}
      <Row className="justify-content-center py-5 px-4">
        <h3 className="mb-4 fw-bold">Frequently Asked Questions</h3>
        <Col xs={12} md={5} className="mb-3 mb-md-0">
          <Accordion defaultActiveKey="0" className="shadow-sm">
            <Accordion.Item eventKey="0">
              <Accordion.Header onClick={() => handleItemClick(0)} style={{ backgroundColor: activeItem === 0 ? '#8dc044' : 'transparent' }}>How do I pay?</Accordion.Header>
              <Accordion.Body>We offer a variety of payment options. If you are unsure of how they all work, please get in touch.
Online Booking:
<li>Credit / debit card</li>
<li>Paypal</li>
<li>Apple / Android Pay</li>
<li>Secure payment link (for customised quotes)</li>
Phone bookings:
<li>Cash – For any additional items to be added to an existing prepaid order</li>
<li>Debit or credit card (either over the phone in advance or on our card terminals using credit debit or any smartphone / contactless method of payment)</li>
<li>Via secure payment link (please consult with our team first)</li>
<li>Bank transfer (please consult with our team first)</li></Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header onClick={() => handleItemClick(1)} style={{ backgroundColor: activeItem === 1 ? '#8dc044' : 'transparent' }}>Do you work weekends?</Accordion.Header>
              <Accordion.Body>YES,
              We work Monday to Saturday, so if you require a weekend collection, we can certainly accommodate this for you on a Saturday. We are closed on Sundays.</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header onClick={() => handleItemClick(2)} style={{ backgroundColor: activeItem === 2 ? '#8dc044' : 'transparent' }}>Where does the waste go?</Accordion.Header>
              <Accordion.Body>
                <p>We are partnered up with multiple commercial recycling facilities across London. So depending on where you are in London, we would send our team to the closest one to you if required. If you have a few items, our teams would continue to complete multiple collections before needing to tip at recycling centres.</p>
                <p>We also upcycle some items where possible. Our aim is to divert as much waste as possible from landfill, whether it means donating your items to charities or organisations or recycling them.</p>
                <p>We are registered with the Environment Agency and are certified Waste Carrier Licence holders. License number CBDU308350.</p>
                <p>This number can be verified by clicking on the following link: <a href='https://environment.data.gov.uk/public-register/view/search-waste-carriers-brokers'className='text-black text-decoration-underline' target='_blank' rel='noopener noreferrer'>https://environment.data.gov.uk/public-register/view/search-waste-carriers-brokers</a></p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header onClick={() => handleItemClick(3)} style={{ backgroundColor: activeItem === 3 ? '#8dc044' : 'transparent' }}>What is classed as hazardous waste?</Accordion.Header>
              <Accordion.Body>For the best and most accurate information, please see the government guidelines with regards to Hazardous Waste. The link is very good at helping you determine whether your waste is Hazardous or not.
<a href="https://www.gov.uk/dispose-hazardous-waste" className='text-black text-decoration-underline' target="_blank" rel="noopener noreferrer">https://www.gov.uk/dispose-hazardous-waste</a></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col xs={12} md={5}>
          <Accordion defaultActiveKey="0" className="shadow-sm">
            <Accordion.Item eventKey="4">
              <Accordion.Header onClick={() => handleItemClick(4)} style={{ backgroundColor: activeItem === 4 ? '#8dc044' : 'transparent' }}>What would my load size be classed as?</Accordion.Header>
              <Accordion.Body>
                <p>If you're booking a load size, please see below to know what load size you should book. To make things easy to visualise, we use a washing machine as an example for the volume of space you would require. We consider 2 options: weight of your load and volume, whichever of the two is reached first.</p>
                <p><strong>QUARTER VAN LOAD:</strong> This is ¼ of our vans capacity. The maximum weight allowance for this collection is 250 kilograms. To visualise the space imagine 8 washing machines stacked up next to each other.</p>
                <p><strong>HALF VAN LOAD:</strong> This is ½ of our vans capacity. The maximum weight allowance for this collection is 500 kilograms. To visualise the space imagine 16 washing machines stacked up next to each other.</p>
                <p><strong>¾ VAN LOAD:</strong> This is ¾ of our vans capacity. The maximum weight allowance for this collection is 725 kilograms. To visualise the space imagine 24 washing machines stacked up next to each other.</p>
                <p><strong>FULL VAN LOAD:</strong> This of our vans capacity is completely full. The maximum weight allowance for this collection is 1,000 kilograms. To visualise the space imagine 32 washing machines stacked up next to each other.</p>
                <p>If you book any of the options above please note that whatever is reached first will be counted. So you may book a full van load, but only one half of the van's volume is used because you reached your 1,000 kilogram weight allowance first.</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header onClick={() => handleItemClick(5)} style={{ backgroundColor: activeItem === 5 ? '#8dc044' : 'transparent' }}>How big are your vans?</Accordion.Header>
              <Accordion.Body>Our vans have the capacity of 20 cubic yards. Maximum weight allowance of 1 tonne. Bigger than most skips.</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header onClick={() => handleItemClick(6)} style={{ backgroundColor: activeItem === 6 ? '#8dc044' : 'transparent' }}>How do I know exactly when you will arrive?</Accordion.Header>
              <Accordion.Body>When you have completed your booking you would have chosen from one of our 4 hour windows. Our drivers will call you on the day when they are on their way to you and usually give around 30 minutes notice before arriving within your scheduled time slot.</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

    </Container>
  );
};

export default Faq;
