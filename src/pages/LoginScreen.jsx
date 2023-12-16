import { useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
  Image,
} from "react-bootstrap";
import facebook_logo from "../assets/facebook_logo.svg";
import google_logo from "../assets/google_logo.svg";
import "../styles/LoginScreen.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  const LoginHandle = (event) => {
    event.preventDefault();
    const userAccount = {
      createdAt: "",
      email: email,
      hash: password,
      hashRT: "",
    };
    const URL =
      "https://advancedweb-finalproject-be.onrender.com/auth/local/signin";
    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(userAccount),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("authenticated", true);
          localStorage.setItem("email", email);
          navigate("/home");
        } else {
          setEmail("");
          setPassword("");
          console.error("Wrong Password or Email!");
        }
      });
  };
  return (
    <div className="">
      <Navbar collapseOnSelect className="myNav">
        <Container className="myContainer">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Brand></Brand>
          <Nav.Link className="signup-link" href="/register">
            Sign up
          </Nav.Link>
        </Container>
      </Navbar>
      <div className="login-container">
        <h1 className="title">WELCOME!</h1>
        <Form>
          <Form.Group className="login-form">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <i className="fa-solid fa-user"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <i className="fa-solid fa-lock"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </InputGroup>

            <Button
              variant="dark"
              className="login-button"
              onClick={LoginHandle}
            >
              Login
            </Button>

            <div className="d-flex justify-content-end">
              <a href="/" style={{ color: "#06234F", textDecoration: "none" }}>
                Forgot Password?
              </a>
            </div>

            <hr />
            <div className="d-flex justify-content-center ">OR LOGIN WITH</div>
          </Form.Group>
        </Form>
        <Container className="logo-container d-flex justify-content-center ">
          <Button variant="link">
            <Image className="logo" src={facebook_logo} alt="Facebook Login" />
          </Button>
          <Button variant="link">
            <Image className="logo" src={google_logo} alt="Google Login" />
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default LoginScreen;
