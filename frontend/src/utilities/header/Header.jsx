import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'; // Import your custom CSS file
import {Link} from 'react-router-dom'
import { FaUserPlus } from "react-icons/fa6";
import { useAuth } from '../../store/Auth';
import { FaUserCheck } from "react-icons/fa6";
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
    <Navbar expand="lg" className={` px-5 custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Navbar.Brand as={Link} to='/' className='Urbanist ms-4'><strong>HYNA</strong></Navbar.Brand>
      <Navbar.Toggle 
        aria-controls="basic-navbar-nav"
        onClick={() => setIsNavbarOpen(!isNavbarOpen)}
      />
      <Navbar.Collapse id="basic-navbar-nav" in={isNavbarOpen}>
        <Nav className="mx-auto">
          <Nav.Link as={Link} to='/' className='Urbanist' onClick={handleLinkClick}>Home</Nav.Link>
          <Nav.Link as={Link} to='/about' className='Urbanist' onClick={handleLinkClick}>About us</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1" className='Urbanist' onClick={handleLinkClick}>Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2" className='Urbanist' onClick={handleLinkClick}>Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3" className='Urbanist' onClick={handleLinkClick}>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" className='Urbanist' onClick={handleLinkClick}>Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to='/account' className='Urbanist nav-icon ' onClick={handleLinkClick}> {isLoggedin ?   <FaUserCheck /> : <FaUserPlus />} </Nav.Link>
         
          <Nav.Link href="#cart" className='Urbanist' onClick={handleLinkClick}>Cart</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      
    </Navbar>
  );
}

export default Header;
