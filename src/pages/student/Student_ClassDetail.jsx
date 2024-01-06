import React, { useEffect, useState } from "react";
import Student_NavBar from "../../components/Student_NavBar";
import "../../styles/Admin_ClassDetail.css";
import { Table, Row, Col, Nav, Tab, Form, Button } from "react-bootstrap";
import ScrollableTable from "../../components/ScrollableTable";
import DragAndDropRow from "../../components/DragAndDropRow";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export default function Student_ClassDetail({ id }) {
  const description_row = 8;
  const class_detail = {
    className: "Data Structure and Algorithms",
    createdBy: "Nguyen Duy Nien",
    participants: 40,
    status: "deactive",
    description:
      "a fundamental subject in computer science and programming. It focuses on the study of organizing and manipulating data efficiently, as well as designing and analyzing algorithms for solving computational problems.",
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

  const grade_list = [
    { name: "Grade 1", percentage: 50 },
    { name: "Grade 2", percentage: 40 },
    { name: "Grade 3", percentage: 10 },
  ];

  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setGrades(grade_list);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Student_NavBar />
        <div className="d-flex flex-column mx-5">
          <h1>{class_detail.className}</h1>
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
                  <Nav.Item>
                    <Nav.Link eventKey="third" style={{ textAlign: "center" }}>
                      Grade
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Form>
                      <Form.Group>
                        <Form.Label className="class-label">
                          Class Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={class_detail.className}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="class-label">
                          Main teacher
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={class_detail.createdBy}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="class-label">
                          Participants
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={class_detail.participants}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="class-label">Status</Form.Label>
                        <Form.Control
                          type="text"
                          value={class_detail.status}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="class-label">
                          Description
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={description_row}
                          value={class_detail.description}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <ScrollableTable
                      items={user_list}
                      disabled={true}
                    ></ScrollableTable>
                  </Tab.Pane>

                  <Tab.Pane eventKey="third">
                    <Form>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th></th>
                            <th>Grade Name</th>
                            <th>Grade Percentage</th>
                            <th>Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {grades.map((grade, index) => (
                            <tr>
                              <td style={{ verticalAlign: "middle" }}>
                                {index + 1}
                              </td>
                              <td>
                                <Form.Control
                                  type="text"
                                  value={grade.name}
                                  readOnly={true}
                                />
                              </td>
                              <td className="d-flex justify-content-center align-items-center">
                                <Form.Control
                                  type="number"
                                  value={grade.percentage}
                                  readOnly={true}
                                  style={{
                                    marginRight: "10px",
                                    width: "100px",
                                  }}
                                />
                                <span>%</span>
                              </td>
                              <td></td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </DndProvider>
  );
}
