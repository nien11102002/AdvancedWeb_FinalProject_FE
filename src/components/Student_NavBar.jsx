import React from "react";
import { Container, Nav, Navbar, Dropdown, Image, Card } from "react-bootstrap";
import Brand from "./Brand";
import avatar from "../assets/Logo.svg";
import "../styles/StudentHomePage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "../context/auth/reducers";

const NotificationItem = ({ notification, index, onClick }) => {
  return (
    <Dropdown.Item onClick={() => onClick(index)}>
      <Card className="dropDown-item">
        <Card.Title className="item-title">{notification.title}</Card.Title>

        <Card.Footer>{notification.date}</Card.Footer>
      </Card>
    </Dropdown.Item>
  );
};

export default function Student_NavBar({ hasNewNotification }) {
  const notifications = [
    {
      id: "01",
      title: "Data Structure and Algorithms",
      date: "2023-12-31T12:30:45",
      body: "Data Structure and AlgorithmsData Structure and AlgorithmsData Structure and AlgorithmsvData Structure and AlgorithmsData Structure and AlgorithmsData Structure and AlgorithmsvData Structure and Algorithms",
      sentBy: "Nguyễn Duy Niên",
    },
    {
      id: "02",
      title: "Data Structure and Algorithms",
      date: "2023-12-31T12:30:45",
      body: "02",
      sentBy: "Nguyễn Duy Niên",
    },
    {
      id: "03",
      title: "Data Structure and Algorithms Data Structure and Algorithms",
      date: "2023-12-31T12:30:45",
      body: "03",
      sentBy: "Nguyễn Duy Niên",
    },
    {
      id: "04",
      title: "Data Structure and Algorithms",
      date: "2023-12-31T12:30:45",
      body: "04",
      sentBy: "Nguyễn Duy Niên",
    },
  ];
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const navigateDetailNotification = (index) => {
    const notificationID = notifications[index].id;
    let path = `/student/notification/${notificationID}`;
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(signOut());
    navigate("/");

    const URL =
      "https://advancedweb-finalproject-educat-be.onrender.com/auth/logout";
  };

  return (
    <Navbar>
      <Container className="myContainer">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Brand></Brand>
        <Nav className="me-auto">
          <Nav.Link href="/student">Home</Nav.Link>
          <Nav.Link href="/notification">Notification</Nav.Link>
          <Nav.Link href="/user-profile">Profile</Nav.Link>
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
              {notifications.map((value, index) => {
                return (
                  <NotificationItem
                    notification={value}
                    index={index}
                    key={index}
                    onClick={navigateDetailNotification}
                  />
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="avatar-dropdown">
              <Image className="avatar" src={avatar}></Image>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/user-profile">Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
