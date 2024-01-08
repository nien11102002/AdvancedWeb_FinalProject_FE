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
import "../styles/RegisterScreen.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { getProfile } from "../service/userService";

function RegisterScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const RegisterHandle = (event) => {
    const URL =
      "https://advancedweb-finalproject-be.onrender.com/auth/local/signup";
    event.preventDefault();
    const userAccount = {
      email: email,
      password: password,
      Type: role,
    };

    console.log(userAccount);
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
          localStorage.setItem("ACCESS_TOKEN", data.access_token);
          const user = getProfile();
          if (user.Type == "student") {
            path = "/student";
            navigate(path);
          } else if (user.Type == "teacher") {
            path = "/teacher";
            navigate(path);
          } else navigate();

          navigate("/");
        } else {
          setEmail("");
          setPassword("");
          console.error("Email has already existed!");
        }
      });
  };
  return (
    <div className="">
      <Navbar collapseOnSelect className="myNav">
        <Container className="myContainer">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Brand></Brand>
          <Nav.Link className="signup-link" href="/login">
            Sign in
          </Nav.Link>
        </Container>
      </Navbar>
      <div className="register-container">
        <h1 className="title">JOIN US!</h1>
        <Form className="register-form">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i className="fa-solid fa-envelope"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="EMAIL"
              aria-label="EMAIL"
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
              placeholder="PASSWORD"
              aria-label="PASSWORD"
              aria-describedby="basic-addon1"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </InputGroup>

          <div
            key={`inline-radio`}
            className="mb-3 d-flex justify-content-between "
          >
            <Form.Check
              inline
              label="Student"
              name="group1"
              type="radio"
              id={`inline-radio-1`}
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />
            <Form.Check
              inline
              label="Teacher"
              name="group1"
              type="radio"
              id={`inline-radio-2`}
              value="teacher"
              checked={role === "teacher"}
              onChange={() => setRole("teacher")}
            />
          </div>

          <Button
            variant="dark"
            className="register-button"
            onClick={RegisterHandle}
          >
            Register
          </Button>

          <hr />
          <div className="d-flex justify-content-center ">OR LOGIN WITH</div>
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

export default RegisterScreen;
