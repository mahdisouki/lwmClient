import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaRecycle, FaPhone, FaMoneyBillWave, FaCertificate, FaClock, FaCreditCard, FaHandsHelping, FaCouch, FaTruckMoving, FaIndustry, FaHandHoldingUsd } from 'react-icons/fa';
import '../css/Home.css'; // Custom CSS

function MyButtonContentSection() {
  const [activeContent, setActiveContent] = useState('sameDay');

  const contentData = {
    sameDay: {
      title: 'Immediate response to requests for quotes',
      description: 'We respond to most quote requests in under 30 minutes.',
      icon: FaClock,
    },
    support: {
      title: '24/7 support 365',
      description: 'Our support team is available around the clock to assist you.',
      icon: FaPhone,
    },
    timeSlot: {
      title: 'Choose a date and time slot that suits you',
      description:
        'Morning (07:00 – 12:00)\nAfternoon (12:00-17:00) MONDAY TO SATURDAY.\nAll day time slot (6:30AM - 8:30PM).',
      icon: FaCalendarAlt,
    },
    extra1: {
      title: 'Same day or next day collections',
      description: "We don't require a lot of notice for bookings. If it's urgent, we can usually send a team to you within 24 hours.",
      icon: FaClock,
    },
    extra2: {
      title: 'Price promise',
      description: 'Offering competitive prices in London with no hidden fees.',
      icon: FaMoneyBillWave,
    },
    extra3: {
      title: 'Fully licensed & certified waste management company',
      description: 'Registered with the Environment Agency. License number: CBDU308350.',
      icon: FaCertificate,
    },
    paymentMethods: {
      title: 'Multiple payment methods accepted',
      description: 'We accept a variety of payment methods for your convenience.',
      icon: FaCreditCard,
    },
    contactless: {
      title: 'Contactless collections',
      description: 'We offer contactless collections for your safety and convenience.',
      icon: FaHandHoldingUsd,
    },
    recycleUpcycle: {
      title: 'Remove, Recycle, Upcycle',
      description: 'We love to recycle or even upcycle. If we can\'t give your old items a new home, we will ensure it gets recycled – 95% of the waste we collect is diverted away from landfill.',
      icon: FaRecycle,
    },
    heavyLifting: {
      title: 'We do the heavy lifting',
      description: 'We always send out a minimum of two workers per team, so you won\'t have to lift a finger. Our staff are happy to collect your unwanted items from inside your property as well.',
      icon: FaTruckMoving,
    },
    dismantle: {
      title: 'We can dismantle furniture',
      description: 'If your items need to be dismantled in order for them to be safely removed, our vans have all the tools required and our staff can dismantle them if necessary.',
      icon: FaCouch,
    },
    businessSupport: {
      title: 'Support for businesses',
      description: 'If you\'re a business that requires regular waste collections, we can support you by offering a contract with flexible payment terms. We currently work closely with a number of estate agents, building firms, restaurants, retail stores and many more.',
      icon: FaIndustry,
    },
  };

  const handleButtonClick = (contentKey) => {
    setActiveContent(contentKey);
  };

  return (
    <section style={{ backgroundColor: '#8dc044', minHeight: '70vh' }}>
      <Container className="my-5 py-5">
        <h1 className="text-center mb-5 text-white">Why Choose London Waste Management?</h1>
        <Row>
          <Col md={4}>
            <div className="custom-scroll">
              <div className="d-flex flex-wrap">
                {Object.entries(contentData).map(([key, item]) => (
                  <div key={key} style={{ width: '50%', marginBottom: '1rem' }}>
                    <Button
                      className={`custom-button w-100 ${activeContent === key ? 'active' : ''}`}
                      onClick={() => handleButtonClick(key)}
                    >
                      <div className="custom-icon-wrapper">
                        <item.icon className="custom-icon" />
                      </div>
                      <span className="button-text">{item.title}</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col md={8}>
            <Card className="custom-card">
              <Card.Body className="py-5">
                <Card.Title>
                  <h2>{contentData[activeContent].title}</h2>
                </Card.Title>
                <Card.Text style={{ whiteSpace: 'pre-line' }}>{contentData[activeContent].description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default MyButtonContentSection;
