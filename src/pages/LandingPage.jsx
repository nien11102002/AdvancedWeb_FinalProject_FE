import "../styles/LandingPage.css";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPagePicture from "../assets/landingPage_img.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import Brand from "../components/Brand";

function LandingPage() {
  const navigate = useNavigate();
  function btn_routeChange() {
    let path = "/register";
    navigate(path);
  }

  function btn_Login() {
    let path = "/login";
    navigate(path);
  }

  return (
    <div>
      <Navbar collapseOnSelect className="myNav">
        <Container className="myContainer">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Brand></Brand>
            <Nav className="me-auto d-flex align-items-center">
              <Nav.Link className="nav-link tw-mr-8" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="nav-link tw-mr-8" href="/">
                About us
              </Nav.Link>
              <Nav.Link className="nav-link tw-mr-8" href="/">
                Classes
              </Nav.Link>
              <Nav.Link className="nav-link tw-mr-8" href="/">
                Help
              </Nav.Link>
            </Nav>

            <Nav>
              <Button onClick={btn_Login} className="login-button">
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="image-container position-relative">
        <Image src={LandingPagePicture} className="w-100"></Image>
        <div className="color-overlay"></div>
        <div className="text-container">
          <div style={{ fontSize: "70px", fontWeight: "bold" }}>
            Modern class
          </div>
          <div style={{ fontSize: "70px", fontWeight: "bold" }}>
            learning with fun
          </div>
          <div style={{ fontSize: "20px" }}>
            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          </div>
          <div style={{ fontSize: "20px" }}>
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </div>
        </div>
        <Button
          className="myButton"
          size="lg"
          variant="color"
          onClick={btn_routeChange}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
