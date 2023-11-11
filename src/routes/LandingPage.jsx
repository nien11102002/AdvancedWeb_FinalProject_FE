import React from 'react';
import '../css/LandingPage.css'
import { Navbar, Container,NavDropdown,Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function LandingPage() {
    return (
        <Navbar collapseOnSelect className="myNav">
        <Container className='myContainer'>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='me-auto'>
                <Nav.Link href="/">EduCat</Nav.Link>
            </Nav>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link href="/">Login</Nav.Link>
              <Nav.Link eventKey={2} href="/">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default LandingPage;