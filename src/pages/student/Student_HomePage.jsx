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
import axios from "axios";
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

export default function Student_HomePage() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClasses, setFilteredClasses] = useState(classDetail);

  const handleClassDetail = () => {};

  const handleJoinClassModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleJoinClass = async () => {
    const URL = `https://advancedweb-finalproject-educat-be.onrender.com/classes/code/${classCode}`;
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      if (data) {
        const user = await getProfile();
        var pathBase;
        if (user.Type == "student") pathBase = "/student";
        else pathBase = "/teacher";
        const path = `${pathBase}/class-detail/${data.class_id}`;
        navigate(path);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
              <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </Button>
          </Form>
        </Container>
        <Container className="student-class-list">
          <Row>
            {filteredClasses.map((value, index) => (
              <Col key={index} md={4} className="mb-3">
                <ClassCard
                  classDetail={value}
                  onClick={handleClassDetail}
                ></ClassCard>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleJoinClass}>
            Join
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
