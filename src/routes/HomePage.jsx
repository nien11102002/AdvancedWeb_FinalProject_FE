import React from 'react';
import '../css/HomePage.css'
import { Navbar, Container,NavDropdown,Nav, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/Logo.svg';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Card() {}

function HomePage(userInfo) {
    //const [isLogin,setLogin]=useState(false);
    function checkLogin() {
        console.log("userinfo: "+userInfo)
        if(Object.keys(userInfo).length !== 0)
        return (
            <NavDropdown title="HI" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">User Profile</NavDropdown.Item>
                <NavDropdown.Item href="/">Log out</NavDropdown.Item>
            </NavDropdown>
            
        )
        else return(
            <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link eventKey={2} href="/register">Register</Nav.Link>
            </Nav>
        )
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
            {checkLogin()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
            <h1>Computer Science</h1>
          <div className='course-swiper'>
          <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                >
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
            </Swiper>
          </div>
            <h1>Finance</h1>
          <div className='course-swiper'>
          <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                >
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
            </Swiper>
          </div>
            <h1>Mechanic</h1>
          <div className='course-swiper'>
          <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                >
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
                <SwiperSlide><Image src={logo} className='card-avatar mx-auto'></Image></SwiperSlide>
            </Swiper>
          </div>
        </div>
    );
}

export default HomePage;