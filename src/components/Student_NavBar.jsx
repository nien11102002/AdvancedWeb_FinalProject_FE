import React from "react";
import { Container, Nav, Navbar, Dropdown, Image } from "react-bootstrap";
import Brand from "./Brand";
import avatar from "../assets/Logo.svg";

export default function Student_NavBar({ hasNewNotification }) {
  return (
    <Navbar>
      <Container className="myContainer">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Brand></Brand>
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/notification">Notification</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="notification-dropdown">
              <i
                className={`fa fa-bell${hasNewNotification ? "-o" : ""}`}
                aria-hidden="true"
                style={{ fontSize: "30px" }}
              ></i>
              {hasNewNotification && <span className="notification-dot"></span>}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Action 1</Dropdown.Item>
              <Dropdown.Item>Action 2</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="avatar-dropdown">
              <Image className="avatar" src={avatar}></Image>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
