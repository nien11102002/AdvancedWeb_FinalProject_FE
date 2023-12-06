import { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/Logo.png";
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
          <Nav.Link className="signup-link">Sign up</Nav.Link>
        </Container>
      </Navbar>
      <div className="login-container">
        <h1>Login</h1>
        <div>
          {/* eslint-disable-next-line react/no-unescaped-entities*/}
          <span>Don't have an account? </span>
          <a href="/register" style={{ color: "#EAC696" }}>
            Create now
          </a>
        </div>
        <Form>
          <Form.Group className="login-form">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>
            <div className="d-flex justify-content-between">
              <Form.Check
                type="checkbox"
                id="default-checkbox"
                label="Save account"
              />
              <a href="/" style={{ color: "#EAC696" }}>
                Forgot Password?
              </a>
            </div>
            <Button
              variant="color"
              className="login-button"
              onClick={LoginHandle}
            >
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default LoginScreen;
