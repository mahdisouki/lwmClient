import React, { useState, useEffect } from "react";
import Image from "../assets/Logo.svg";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Offcanvas,
  Button,
  Badge,
  NavDropdown,
  Row,
  Col,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { FaSearch, FaPhone, FaShoppingBag, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import useStore from "../store";
import "../css/Header.css";
import CallIcon from '../assets/call (1).png';
import CartIcon from '../assets/reshot-icon-shopping-cart-DNZLQAYFG8.svg';

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false); // Track Navbar state
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showMobileMoreDropdown, setShowMobileMoreDropdown] = useState(false);
  const navigate = useNavigate();

  const { cart, categories, getAllCategories } = useStore();

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/services?search=${searchTerm}`);
      setExpanded(false); // Collapse Navbar after search
    }
  };

  const handleNavClick = () => setExpanded(false); // Collapse Navbar on Nav click

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 992;

  return (
    <header>
      <Container style={{position: 'relative'}}>
        <Navbar
          expand="lg"
          className="sticky-navbar"
          variant="dark"
          expanded={expanded}
          onToggle={setExpanded}
        >
          <Container>
            <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
              <img src={Image} className="logo-img" alt="Logo" height="50" />
            </Navbar.Brand>
            <div className="navbar-icons-mobile d-flex d-lg-none align-items-center" style={{gap: '10px'}}>
              <Button variant="link" className="p-0  d-flex align-items-center justify-content-center" style={{width: 32, height: 32}} onClick={() => setShowMobileSearch(true)}>
                <FaSearch className="cart-icon-img" color="white" size={20} />
              </Button>
              <a href="tel:+442030971517" className="header-call me-2 d-flex align-items-center justify-content-center" style={{width: 32, height: 32}}>
                <img src={CallIcon} alt="Call" className="cart-icon-img" width={20} height={20} style={{filter: 'invert(1)'}} />
              </a>
              <div className="cart-icon d-flex align-items-center justify-content-center" onClick={()=>{
                setExpanded(false);
                if (showCart) {
                  handleCloseCart();
                } else {
                  handleShowCart();
                }
              }} style={{ cursor: "pointer", position: "relative", width: 32, height: 32 , marginRight: '10px' ,alignItems: 'center !important' , justifyContent: 'center'}}>
                <img src={CartIcon} alt="Cart" width={24} height={24} style={{filter: 'invert(1)'}} className="cart-icon-img" />
                {cartCount > 0 && (
                  <Badge bg="danger" pill style={{ position: "absolute", top: "-5px", right: "-10px", fontSize: "12px" }}>
                    {cartCount}
                  </Badge>
                )}
              </div>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
                  Home
                </Nav.Link>

                {isDesktop ? (
                  <NavDropdown
                    title="Waste Removal Services"
                    id="services-nav-dropdown"
                    show={showDropdown}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="custom-dropdown"
                  >
                    <Row style={{ minWidth: "600px" }} >
                      <Col md={6}>
                        <NavDropdown.Item
                          as={Link}
                          to="/services"
                          onClick={() => {
                            setExpanded(false);
                            handleMouseLeave();
                          }}
                        >
                          All
                        </NavDropdown.Item>
                        {categories?.slice(0, Math.ceil(categories.length / 2)).map((category) => (
                          <NavDropdown.Item
                            as={Link}
                            to={`/services?category=${category._id}`}
                            key={category._id}
                            onClick={() => {
                              setExpanded(false);
                              handleMouseLeave();
                            }}
                          >
                            {category.name}
                          </NavDropdown.Item>
                        ))}
                      </Col>
                      <Col md={6}>
                        {categories?.slice(Math.ceil(categories.length / 2)).map((category) => (
                          <NavDropdown.Item
                            as={Link}
                            to={`/services`}
                            key={category._id}
                            onClick={() => setExpanded(false)}
                          >
                            {category.name}
                          </NavDropdown.Item>
                        ))}
                      </Col>
                    </Row>
                  </NavDropdown>
                ) : (
                  <NavDropdown
                    title="Waste Removal Services"
                    id="services-nav-dropdown"
                    className="custom-dropdown"
                    show={showMobileDropdown}
                    onClick={() => setShowMobileDropdown((prev) => !prev)}
                  >
                    {showMobileDropdown && (
                      <>
                        <NavDropdown.Item
                          as={Link}
                          to="/services"
                          onClick={() => {
                            setExpanded(false);
                            setShowMobileDropdown(false);
                          }}
                        >
                          All Categories
                        </NavDropdown.Item>
                        {categories?.map((category) => (
                          <NavDropdown.Item
                            as={Link}
                            to={`/services?category=${category._id}`}
                            key={category._id}
                            onClick={() => {
                              setExpanded(false);
                              setShowMobileDropdown(false);
                            }}
                          >
                            {category.name}
                          </NavDropdown.Item>
                        ))}
                      </>
                    )}
                  </NavDropdown>
                )}

                <Nav.Link as={Link} to="/moving-services" onClick={() => setExpanded(false)} className="no-wrap">
                  Moving Services
                </Nav.Link>
                <Nav.Link as={Link} to="/quote" onClick={() => setExpanded(false)}>
                  Quote
                </Nav.Link>
                <Nav.Link as={Link} to="/blog" onClick={() => setExpanded(false)}>
                  Blogs
                </Nav.Link>

                {/* More Dropdown */}
                {isDesktop ? (
                  <NavDropdown 
                    title="More" 
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item 
                      as={Link} 
                      to="/Contact" 
                      onClick={() => setExpanded(false)}
                    >
                      Contact
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      as={Link} 
                      to="/faq" 
                      onClick={() => setExpanded(false)}
                    >
                      FAQ
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavDropdown
                    title="More"
                    id="basic-nav-dropdown"
                    show={showMobileMoreDropdown}
                    onClick={() => setShowMobileMoreDropdown((prev) => !prev)}
                  >
                    {showMobileMoreDropdown && (
                      <>
                        <NavDropdown.Item 
                          as={Link} 
                          to="/Contact" 
                          onClick={() => {
                            setExpanded(false);
                            setShowMobileMoreDropdown(false);
                          }}
                        >
                          Contact
                        </NavDropdown.Item>
                        <NavDropdown.Item 
                          as={Link} 
                          to="/faq" 
                          onClick={() => {
                            setExpanded(false);
                            setShowMobileMoreDropdown(false);
                          }}
                        >
                          FAQ
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                )}
              </Nav>

              {/* Mobile Search Modal */}
              <Modal show={showMobileSearch} onHide={() => setShowMobileSearch(false)} centered contentClassName="mobile-search-modal">
                <Modal.Body className="p-3">
                  <Form className="d-flex" onSubmit={e => { handleSearch(e); setShowMobileSearch(false); }} style={{ width: '100%' }}>
                    <InputGroup style={{ width: '100%' }}>
                      <FormControl
                        type="text"
                        placeholder="Search Here"
                        className="py-2 custom-placeholder cart-icon-img"
                        style={{ borderRadius: "10px", backgroundColor: "#fff3", borderColor: "#fff3", color: "black" }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                      />
                      <Button variant="success" type="submit" style={{ borderRadius: "0 10px 10px 0" }}>
                        <FaSearch className="cart-icon-img" color="white" />
                      </Button>
                    </InputGroup>
                  </Form>
                </Modal.Body>
              </Modal>

              {/* Desktop Icons/Search Row - only visible on desktop */}
              <div className="d-none d-lg-flex align-items-center w-100 justify-content-center mt-3 mb-2">
                <Form className="d-flex me-2" onSubmit={handleSearch} style={{ minWidth: 0 }}>
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Search Here"
                      className="py-2 custom-placeholder"
                      style={{
                        borderRadius: "10px",
                        backgroundColor: "#fff3",
                        borderColor: "#fff3",
                        color: "black",
                        minWidth: 0,
                        width: "50%"
                      }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="light" type="submit" style={{ borderRadius: "0 10px 10px 0", background:"none", position:"relative", right:"40px", zIndex:5 }}>
                      <FaSearch color="#263238" />
                    </Button>
                  </InputGroup>
                </Form>
                <a href="tel:+442030971517" className="header-call me-2">
                  <img src={CallIcon} alt="Call" className="cart-icon-img" width={25} height={25} style={{filter: 'invert(1)'}} />
                </a>
                <div className="cart-icon" onClick={()=>{
                  setExpanded(false);
                  if (showCart) {
                    handleCloseCart();
                  } else {
                    handleShowCart();
                  }
                }} style={{ cursor: "pointer", position: "relative" }}>
                  <img className="cart-icon-img" src={CartIcon} alt="Cart" width={25} height={25} style={{filter: 'invert(1)'}} />
                  {cartCount > 0 && (
                    <Badge bg="danger" pill style={{ position: "absolute", top: "-5px", right: "-10px", fontSize: "12px" }}>
                      {cartCount}
                    </Badge>
                  )}
                </div>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* Social Media Icons Bottom Right Inside Header */}
       
        <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
          <Cart />
        </Offcanvas>
      </Container>
    </header>
  );
};

export default Header;
