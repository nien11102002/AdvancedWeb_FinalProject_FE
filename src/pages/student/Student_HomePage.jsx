import React from "react";
import Student_NavBar from "../../components/Student_NavBar";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import ClassCard from "../../components/ClassCard";
import "../../styles/Admin_UsersManagement.css";

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
    name: "Data Structure and Algorithms",
    description:
      "A subject about learning the structure of data, how we store it and learn about the algorithms to optimize the access of data",
    participants: 40,
    teacherName: "Nguyen Duy Nien",
    schedule: "Monday",
    time: "7:30 - 11:30",
  },
  {
    id: "03",
    name: "Data Structure and Algorithms",
    description:
      "A subject about learning the structure of data, how we store it and learn about the algorithms to optimize the access of data",
    participants: 40,
    teacherName: "Nguyen Duy Nien",
    schedule: "Monday",
    time: "7:30 - 11:30",
  },
  {
    id: "04",
    name: "Data Structure and Algorithms",
    description:
      "A subject about learning the structure of data, how we store it and learn about the algorithms to optimize the access of data",
    participants: 40,
    teacherName: "Nguyen Duy Nien",
    schedule: "Monday",
    time: "7:30 - 11:30",
  },
];

export default function Student_HomePage() {
  function ClassDetailHandle() {}
  return (
    <div>
      <Student_NavBar></Student_NavBar>
      <Container className="search-container">
        <Form className="search-bar d-flex">
          <FormControl
            type="text"
            name="searchTerm"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button type="submit" variant="custom">
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
        </Form>
      </Container>
      <Container className="class-list">
        <Row>
          {classDetail.map((value, index) => (
            <Col key={index} md={4} className="mb-3">
              <ClassCard
                classDetail={value}
                onClick={ClassDetailHandle()}
              ></ClassCard>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
