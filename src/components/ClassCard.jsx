import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../styles/Admin_UsersManagement.css";
import { Link } from "react-router-dom";

export default function ClassCard({ classDetail, onClick }) {
  const { id, name } = classDetail;
  const classDetailUrl = `/class-detail/${id}`;
  return (
    <Link to={classDetailUrl}>
      <Card onClick={onClick()}>
        <Card.Header>{classDetail?.name}</Card.Header>
        <Card.Body>
          <Card.Text>{classDetail?.description}</Card.Text>
          <Row>
            <Col className="d-flex justify-content-left align-items-center ">
              <i className="fa-solid fa-users"></i>
              <Card.Text>
                {classDetail?.participants}
                <span> participants</span>
              </Card.Text>
            </Col>

            <Col className="d-flex justify-content-left align-items-center ">
              <i className="fa-solid fa-user"></i>
              <Card.Text>{classDetail?.teacherName}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-left align-items-center ">
              <i className="fa-solid fa-calendar-days"></i>
              <Card.Text>{classDetail?.schedule}</Card.Text>
            </Col>
            <Col className="d-flex align-items-center ">
              <i className="fa-solid fa-clock"></i>
              <Card.Text className="text">{classDetail?.time}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Link>
  );
}
