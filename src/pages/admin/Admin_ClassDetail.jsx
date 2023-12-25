import React, { useState } from "react";
import Admin_NavBar from "../../components/Admin_NavBar";
import { Container, Row, Col, Nav, Button, Form, Tab } from "react-bootstrap";
import "../../styles/Admin_ClassDetail.css";
import ScrollableTable from "../../components/ScrollableTable";

export default function Admin_ClassDetail() {
  const course = {
    className: "Data Structure and Algorithms",
    createdBy: "Nguyen Duy Nien",
    participants: 40,
    status: "deactive",
  };

  const user_list = [
    {
      id: "01",
      avatar: "N",
      fullName: "Nguyen Duy Nien",
      role: "student",
      status: "active",
      email: "ndnien@gmail.com",
    },
    {
      id: "02",
      avatar: "N",
      fullName: "Nguyen Duy Nien",
      role: "student",
      status: "active",
      email: "ndnien@gmail.com",
    },
    {
      id: "03",
      avatar: "N",
      fullName: "Nguyen Duy Nien",
      role: "student",
      status: "active",
      email: "ndnien@gmail.com",
    },
    {
      id: "04",
      avatar: "N",
      fullName: "Nguyen Duy Nien",
      role: "student",
      status: "active",
      email: "ndnien@gmail.com",
    },
  ];

  const [isEditMode, setEditMode] = useState(false);
  const [teacherName, setTeacherName] = useState(course.createdBy);
  const [className, setClassName] = useState(course.className);
  const [participants, setParticipants] = useState(course.participants);
  const [status, setStatus] = useState(course.status);

  const handleEditClick = () => {
    setEditMode(!isEditMode);
  };

  const handleSubmit = () => {};

  return (
    <div>
      <Admin_NavBar />
      <Container>
        <h1>{course.className}</h1>
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
                    Participants
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label className="class-label">
                        Class Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={className}
                        onChange={(event) => setClassName(event.target.value)}
                        readOnly={!isEditMode}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="class-label">
                        Main teacher
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={teacherName}
                        onChange={(event) => setTeacherName(event.target.value)}
                        readOnly={!isEditMode}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="class-label">
                        Participants
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={participants}
                        onChange={(event) =>
                          setParticipants(event.target.value)
                        }
                        readOnly={!isEditMode}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="class-label">Status</Form.Label>
                      <Form.Select
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        disabled={!isEditMode}
                      >
                        <option value="active">Active</option>
                        <option value="deactive">Deactive</option>
                      </Form.Select>
                    </Form.Group>
                    {isEditMode ? (
                      <Button onClick={handleEditClick}>Save</Button>
                    ) : (
                      <Button type="submit" onClick={handleEditClick}>
                        Edit
                      </Button>
                    )}
                  </Form>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <ScrollableTable items={user_list}></ScrollableTable>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}
