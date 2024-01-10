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
import { getProfile } from "../service/userService";
import { useAuth } from "../hooks/useAuth";
import { signIn } from "../context/auth/reducers";
import { gapi } from "gapi-script";

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuth();

  const LoginHandle = async (event) => {
    event.preventDefault();
    const userAccount = {
      email: email,
      password: password,
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
      console.log(data);
      if (data) {
        var path;
        localStorage.setItem("ACCESS_TOKEN", data.access_token);

        const user = await getProfile();
        dispatch(signIn({ user }));
        if (user.isBanned) {
          path = "/";
          navigate(path);
          localStorage.clear();
        } else {
          if (user.Type == "student") {
            path = "/student";
            navigate(path);
          } else if (user.Type == "teacher") {
            path = "/teacher";
            navigate(path);
          } else navigate("/admin/user-management");
        }
      } else {
        setEmail("");
        setPassword("");
        console.error("Wrong Password or Email!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleGoogleLogin = (response) => {
    const accessToken = response?.credential?.accessToken;
    function start() {
      gapi.client.init({
        clientID:
          "576434745134-fdqkbfv966uls3idvloppqei9mn2p3s2.apps.googleusercontent.com",
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
    console.log("accessToken: ", accessToken);
    console.log("Google login success:", response);
  };

  const handleGoogleLoginError = (error) => {
    console.error("Google login error:", error);
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
          <GoogleOAuthProvider clientId="576434745134-fdqkbfv966uls3idvloppqei9mn2p3s2.apps.googleusercontent.com">
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
