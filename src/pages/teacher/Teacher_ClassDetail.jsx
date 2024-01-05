import React, { useEffect, useState } from "react";
import Student_NavBar from "../../components/Student_NavBar";
import "../../styles/Admin_ClassDetail.css";
import { Table, Row, Col, Nav, Tab, Form, Button } from "react-bootstrap";
import ScrollableTable from "../../components/ScrollableTable";
import { DndProvider } from "react-dnd";
import DragAndDropRow from "../../components/DragAndDropRow";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Teacher_ClassDetail({ id }) {
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

  const grade_list = [];

  const [initialGrades, setInitialGrades] = useState([]);
  const [grades, setGrades] = useState([{ name: "", percentage: "" }]);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setInitialGrades(grade_list);
    setGrades(grade_list);
  }, []);

  const handleAddRow = () => {
    setGrades([...grades, { name: "", percentage: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = { ...updatedGrades[index], [field]: value };
    setGrades(updatedGrades);
  };

  const moveRow = (fromIndex, toIndex) => {
    const updatedGrades = [...grades];
    const [removed] = updatedGrades.splice(fromIndex, 1);
    updatedGrades.splice(toIndex, 0, removed);
    setGrades(updatedGrades);
  };

  const deleteRow = (index) => {
    const updatedGrades = grades.filter((grade, i) => i !== index);
    setGrades(updatedGrades);
  };

  const handleSaveGrades = () => {
    const updatedGradeList = [...grades];
    setInitialGrades([...grades]);
    toggleEdit();
  };

  const handleCancel = () => {
    setGrades([...initialGrades]);
    toggleEdit();
  };

  const toggleEdit = () => {
    setEditable(!editable);
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
                            {editable ? <th>Action</th> : <></>}
                          </tr>
                        </thead>
                        <tbody>
                          {grades.map((grade, index) => (
                            <DragAndDropRow
                              key={index}
                              index={index}
                              moveRow={moveRow}
                              deleteRow={deleteRow}
                              handleInputChange={handleInputChange}
                              name={grade.name}
                              percentage={grade.percentage}
                              readMode={!editable}
                            />
                          ))}
                        </tbody>
                      </Table>
                      {editable ? (
                        <Button variant="primary" onClick={handleAddRow}>
                          +
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Form>

                    {editable ? (
                      <div style={{ marginTop: "10px" }}>
                        <Button variant="info" onClick={handleSaveGrades}>
                          Save
                        </Button>
                        <Button
                          variant="danger"
                          onClick={handleCancel}
                          style={{ marginLeft: "10px" }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button variant="info" onClick={toggleEdit}>
                        Edit
                      </Button>
                    )}
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