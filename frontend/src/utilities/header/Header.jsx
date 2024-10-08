import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'; // Import your custom CSS file
import {Link} from 'react-router-dom'
import { FaUserPlus } from "react-icons/fa6";
import { useAuth } from '../../store/Auth';
import { FaUserCheck } from "react-icons/fa6";
import Search from '../../components/searchbar/Search';
function Header() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLinkClick = () => {
    if (isNavbarOpen) {
      setIsNavbarOpen(false);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) { // Adjust scroll value as needed
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { isLoggedin } = useAuth();

  return (
    <Navbar expand="lg" className={`custom-navbar fixed-top px-5  ${isScrolled ? 'scrolled' : ''}`}>
      <Navbar.Brand as={Link} to='/' className='Urbanist ms-4'><strong>HYNA</strong></Navbar.Brand>
      <Navbar.Toggle 
        aria-controls="basic-navbar-nav"
        onClick={() => setIsNavbarOpen(!isNavbarOpen)}
      />
      <Navbar.Collapse id="basic-navbar-nav" in={isNavbarOpen}>
        <Nav className="mx-auto">
          <Nav.Link as={Link} to='/' className='Urbanist' onClick={handleLinkClick}>Home</Nav.Link>
          <Nav.Link as={Link} to='/about' className='Urbanist' onClick={handleLinkClick}>About us</Nav.Link>
          <Nav.Link as={Link} to='/products' className='Urbanist' onClick={handleLinkClick}>Products</Nav.Link>
          <NavDropdown title="Pages" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to='/faq' className='Urbanist' onClick={handleLinkClick}>FAQ'S</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/terms' className='Urbanist' onClick={handleLinkClick}>Terms & Conditions</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/privacy' className='Urbanist' onClick={handleLinkClick}>Privacy Policy</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to='/refund' className='Urbanist' onClick={handleLinkClick}>Refund Policy</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to='/contact' className='Urbanist' onClick={handleLinkClick}>Contact</Nav.Link>

        </Nav>
        <Nav className="ml-auto align-items-start">
        <Nav.Link  className='Urbanist nav-icon' >
          <Search/>
        </Nav.Link>
          <Nav.Link as={Link} to='/account' className='Urbanist nav-icon ' onClick={handleLinkClick}> {isLoggedin ?   <FaUserCheck /> : <FaUserPlus />} </Nav.Link>
         
          <Nav.Link as={Link} to="cart" className='Urbanist' onClick={handleLinkClick}>Saved</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      
    </Navbar>
  );
}

export default Header;
