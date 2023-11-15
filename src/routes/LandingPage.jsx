import React from 'react';
import '../css/LandingPage.css'
import { Navbar, Container,NavDropdown,Nav, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/Logo.svg';
import LandingPagePicture from '../assets/landingPage_img.jpg';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate=useNavigate();
    function btn_routeChange(){
      let path='/home';
      navigate(path);
    }

    return (
        <div>
          <Navbar collapseOnSelect className="myNav">
        <Container className='myContainer'>
            <Navbar.Brand href='/'><Image src={logo} className='logo'></Image></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='me-auto'>
                <Nav.Link href="/" className='brand'>EduCat</Nav.Link>
            </Nav>
            <Nav className="me-auto mid-nav">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/courses">Courses</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
              <Nav.Link href="/pricing">Pricing</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link eventKey={2} href="/register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
          <div className='image-container position-relative'>
            <Image src={LandingPagePicture} className='w-100'></Image>
            {/* <a href='/home'> */}
              <Button className='myButton' size='lg' variant='color' onClick={btn_routeChange}>Learn More</Button>
            {/* </a> */}
          </div>
        </div>
    );
}

export default LandingPage;