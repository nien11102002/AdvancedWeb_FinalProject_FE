import React from "react";
import { Container, Nav, Navbar, Dropdown, Image } from "react-bootstrap";
import Brand from "./Brand";
import avatar from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "../context/auth/reducers";

export default function Admin_NavBar({ hasNewNotification }) {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(signOut());
    navigate("/");
  };
  return (
    <Navbar>
      <Container className="myContainer">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Brand></Brand>
        <Nav className="me-auto">
          <Nav.Link href="/home">User Account</Nav.Link>
          <Nav.Link href="/class-management">Classes</Nav.Link>
        </Nav>
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="avatar-dropdown">
              <Image className="avatar" src={avatar}></Image>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Users </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
