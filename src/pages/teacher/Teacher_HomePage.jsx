import React, { useState } from "react";
import Student_NavBar from "../../components/Student_NavBar";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Modal,
  Row,
} from "react-bootstrap";
import ClassCard from "../../components/ClassCard";
import "../../styles/StudentHomePage.css";
import { useNavigate } from "react-router-dom";

const classDetail = [
  {
    id: "01",
    name: "Data Structure and Algorithms",
    description:
      "A subject about learning the structure of data, how we store it and learn about the algorithms to optimize the access of data",
    participants: 40,
    teacherName: "Nguyen Duy Nien",
    schedule: "Monday",
    time: "7:30 - 11:30",
  },
  {
    id: "02",
    name: "ABC",
    description:
      "A subject about learning the structure of data, how we store it and learn about the algorithms to optimize the access of data",
    participants: 40,
    teacherName: "Nguyen Duy Nien",
    schedule: "Monday",
    time: "7:30 - 11:30",
  },
  {
    id: "03",
    name: "CDE",
    description:
      "A subject about learning the structure of data, how we store it and learn about the algorithms to optimize the access of data",
    participants: 40,
    teacherName: "Nguyen Duy Nien",
    schedule: "Monday",
    time: "7:30 - 11:30",
  },
  {
    id: "04",
    name: "Data",
    description:
      "A subject about learning the structure of data, how we store it and learn about the algorithms to optimize the access of data",
    participants: 40,
    teacherName: "Nguyen Duy Nien",
    schedule: "Monday",
    time: "7:30 - 11:30",
  },
];

export default function Teacher_HomePage() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClasses, setFilteredClasses] = useState(classDetail);
  const [newClassName, setNewClassName] = useState("");
  const [newClassCode, setNewClassCode] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");

  const navigate = useNavigate();
  //Create Class Modal
  const handleCreateClassModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateClassModal = () => {
    setShowCreateModal(false);
  };

  function generateUniqueNumber() {
    const timestamp = new Date().getTime().toString();
    const randomDigits = Math.floor(Math.random() * 100000000000000)
      .toString()
      .padStart(15, "0");
    return timestamp + randomDigits;
  }

  function getCurrentTimestamp() {
    const now = new Date();

    const year = now.getUTCFullYear();
    const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = now.getUTCDate().toString().padStart(2, "0");
    const hours = now.getUTCHours().toString().padStart(2, "0");
    const minutes = now.getUTCMinutes().toString().padStart(2, "0");
    const seconds = now.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = now.getUTCMilliseconds().toString().padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }

  const handleCreateClass = async () => {
    const id = generateUniqueNumber();
    const inviteLink = `https://advanced-web-final-project-fe.vercel.app/invite/${id}`;
    const className = newClassName;
    const classCode = newClassCode;
    const classDescription = newClassDescription;
    const createdAt = getCurrentTimestamp();

    const classData = {
      class_id: id,
      created_at: createdAt,
      updated_at: createdAt,
      invite_code: classCode,
      invite_link: inviteLink,
    };
    const URL =
      "https://advancedweb-finalproject-educat-be.onrender.com/classes";
    try {
      const response = await axios.post(URL, classData, {
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const data = await response.data;
      if (data) {
        const path = `/teacher/class-detail/${data.class_id}`;
        navigate(path);
      }
    } catch (error) {
      console.error("Error during create class:", error);
    }
  };

  //Join Class Modal
  const handleJoinClassModal = () => {
    setShowJoinModal(true);
  };

  const handleCloseJoinClassModal = () => {
    setShowJoinModal(false);
  };

  const handleJoinClass = () => {};

  //Search Bar Logic
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterClasses(event.target.value);
  };

  const filterClasses = (term) => {
    const filtered = classDetail.filter((classItem) =>
      classItem.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredClasses(filtered);
  };

  return (
    <div>
      <Student_NavBar></Student_NavBar>
      <div className="d-flex flex-column align-items-center ">
        <Container className="student-search-container">
          <Form className="student-search-bar d-flex">
            <FormControl
              type="text"
              name="searchTerm"
              placeholder="Search"
              className="mr-sm-2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button type="submit" variant="custom">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
            <Button variant="custom" onClick={handleJoinClassModal}>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </Button>
            <Button variant="custom" onClick={handleCreateClassModal}>
              <i className="fa-solid fa-plus"></i>
            </Button>
          </Form>
        </Container>
        <Container className="student-class-list">
          <Row>
            {filteredClasses.map((value, index) => (
              <Col key={index} md={4} className="mb-3">
                <ClassCard classDetail={value}></ClassCard>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Join Class Modal */}
      <Modal show={showJoinModal} onHide={handleCloseJoinClassModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Join Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Class Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Class Code"
              value={classCode}
              onChange={(event) => setClassCode(event.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseJoinClassModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleJoinClass}>
            Join
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Class Modal */}
      <Modal
        dialogClassName="custom-modal"
        show={showCreateModal}
        onHide={handleCloseCreateClassModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className="class-label">Class Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Class Name"
                value={newClassName}
                onChange={(event) => setNewClassName(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="class-label">Class Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Class Code"
                value={newClassCode}
                onChange={(event) => setNewClassCode(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="class-label">Class Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                rows={8}
                value={newClassDescription}
                onChange={(event) => setNewClassDescription(event.target.value)}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label className="class-label">Class Schedule</Form.Label>
              <Form.Control
                type="text"
                placeholder="Schedule"
                value={newClassSchedule}
                onChange={(event) => setNewClassSchedule(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="class-label">Class Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Time"
                value={newClassTime}
                onChange={(event) => setNewClassTime(event.target.value)}
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateClassModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateClass}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
