import React from "react";
import Admin_NavBar from "../../components/Admin_NavBar";
import { Container, Row, Col, Nav, Button, Form, Tab } from "react-bootstrap";

export default function Admin_ClassDetail() {
  return (
    <div>
      <Admin_NavBar />
      <Tab.Container id="left" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first" style={{ textAlign: "center" }}>
                  Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" style={{ textAlign: "center" }}>
                  Paricipants
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">First tab content</Tab.Pane>
              <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
