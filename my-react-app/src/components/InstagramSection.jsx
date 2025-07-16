import React from 'react';
import { Container } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';

const InstagramSection = () => (
  <Container className="follow-us-section py-5">
    <h2 className="text-center mb-4">
      Looking For The Best Waste Removal Team In London? Follow Us Here!
    </h2>
    <div className="text-center mb-3">
      <a
        href="https://www.instagram.com/explore/tags/rubbishlovers/"
        target="_blank"
        rel="noopener noreferrer"
        className="hashtag-link"
        style={{ color: '#E1306C', fontWeight: 600, fontSize: '1.2rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <FaInstagram size={24} color='#8dc044' /> <span className='text-black text-decoration-underline'>#rubbishlovers</span>
      </a>
    </div>
    <div style={{ width: '100%', minHeight: '400px' }}>
      <iframe
        src="//lightwidget.com/widgets/da5e449e10f8501f8624664a994f128f.html"
        scrolling="no"
        allowTransparency="true"
        className="lightwidget-widget"
        style={{ width: '100%', border: 0, overflow: 'hidden', minHeight: '400px' }}
        title="Instagram Feed"
      ></iframe>
    </div>
  </Container>
);

export default InstagramSection;
