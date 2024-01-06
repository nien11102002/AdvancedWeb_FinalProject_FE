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
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  const LoginHandle = async (event) => {
    event.preventDefault();
    const userAccount = {
      createdAt: "",
      email: email,
      password: password,
      hashRT: "",
    };
    const URL =
      "https://advancedweb-finalproject-educat-be.onrender.com/auth/signin";

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(userAccount),
      });

      const data = await response.json();

      if (data) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        await getAccountType(localStorage.getItem("access_token"));

        console.log(localStorage.getItem("type"));

        navigate("/home");
      } else {
        setEmail("");
        setPassword("");
        console.error("Wrong Password or Email!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const getAccountType = async (access_token) => {
    console.log(access_token);
    const url =
      "https://advancedweb-finalproject-educat-be.onrender.com/auth/profileUser";

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const data = await response.json();
      localStorage.setItem("type", data.Type);
      return data.Type;
    } catch (error) {
      console.error("Error getting account type:", error);
      return null;
    }
  };

  const handleGoogleLogin = (response) => {
    console.log("Google login success:", response);
    // Handle the successful login, e.g., set user state or send the token to your server.
    // You can use the response.accessToken to get the Google access token.
  };

  const handleGoogleLoginError = (error) => {
    console.error("Google login error:", error);
    // Handle login error.
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
        <Form className="login-form">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i className="fa-solid fa-user"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Email"
              aria-label="Email"
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

          <Button variant="dark" className="login-button" onClick={LoginHandle}>
            Login
          </Button>

          <div className="d-flex justify-content-end">
            <a href="/" style={{ color: "#06234F", textDecoration: "none" }}>
              Forgot Password?
            </a>
          </div>

          <hr />
          <div className="d-flex justify-content-center ">OR LOGIN WITH</div>
        </Form>
        <Container className="logo-container d-flex justify-content-center ">
          <Button variant="link">
            <Image className="logo" src={facebook_logo} alt="Facebook Login" />
          </Button>
          <GoogleOAuthProvider clientId="1008597197236-msv1146f6rifk05050lb7lmmpul2rk0m.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleGoogleLoginError}
              redirectUri="https://advancedweb-finalproject-educat-be.onrender.com/auth/google/login"
            />
          </GoogleOAuthProvider>
        </Container>
      </div>
    </div>
  );
}

export default LoginScreen;
