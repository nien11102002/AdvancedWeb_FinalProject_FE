import React from "react";
import { Container, Nav, Navbar, Dropdown, Image } from "react-bootstrap";
import Brand from "./Brand";
import avatar from "../assets/Logo.svg";

export default function Admin_NavBar({ hasNewNotification }) {
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
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
