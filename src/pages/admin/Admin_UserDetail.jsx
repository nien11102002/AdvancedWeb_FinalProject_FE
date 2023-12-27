import React, { useState } from "react";
import Admin_NavBar from "../../components/Admin_NavBar";
import "../../styles/Admin_UsersManagement.css";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import avatar from "../../assets/Logo.svg";

export default function Admin_UserDetail({}) {
  const user = {
    fullName: "Nguyễn Duy Niên",
    dob: "2002-10-11",
    gender: "male",
    email: "ndnien@gmail.com",
  };

  const [fullName, setFullName] = useState(user.fullName);
  const [dob, setDOB] = useState(user.dob);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [isEditMode, setEditMode] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fullName);
    console.log(email);
    console.log(dob);
    console.log(gender);
    console.log(isEditMode);
  };

  const handleEditClick = () => {
    setEditMode(!isEditMode);
  };

  return (
    <div>
      <Admin_NavBar></Admin_NavBar>

      <Row className="content">
        <Col xs={4}>
          <Container className="left-container">
            <Container className="d-flex flex-column avatar-container justify-content-left">
              <Container
                style={{ width: "250px", height: "250px" }}
                className="img bg-white"
              >
                <Image className="avatar" src={avatar}></Image>
              </Container>

              <Button className="btn-editAvatar">Change Avatar</Button>
            </Container>
          </Container>
        </Col>
        <Col xs={8}>
          <Container className="table-container">
            <Form onSubmit={handleSubmit} className="detail-form bg-white">
              <Container className="d-flex flex-column ">
                <Form.Group>
                  <Form.Label className="user-label">Full Name</Form.Label>
                  <Form.Control
                    className="user-input"
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    readOnly={!isEditMode}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="user-label">Date of birth</Form.Label>
                  <Form.Control
                    className="user-input"
                    type="date"
                    value={dob}
                    onChange={(event) => setDOB(event.target.value)}
                    readOnly={!isEditMode}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="user-label">Email</Form.Label>
                  <Form.Control
                    className="user-input"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    readOnly={!isEditMode}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label style={{ width: "200px" }}>Gender</Form.Label>
                  <Form.Check
                    type="radio"
                    value="male"
                    onChange={(event) => {
                      if (isEditMode) setGender(event.target.value);
                    }}
                    readOnly={!isEditMode}
                    checked={gender === "male"}
                    label="male"
                    name="gender"
                  />
                  <Form.Check
                    type="radio"
                    value="female"
                    onChange={(event) => {
                      if (isEditMode) setGender(event.target.value);
                    }}
                    readOnly={!isEditMode}
                    checked={gender === "female"}
                    label="female"
                    name="gender"
                  />
                </Form.Group>
              </Container>
              {isEditMode ? (
                <Button onClick={handleEditClick}>Save</Button>
              ) : (
                <Button type="submit" onClick={handleEditClick}>
                  Edit
                </Button>
              )}
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
