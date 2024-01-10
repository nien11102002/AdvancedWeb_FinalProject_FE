import React, { useEffect, useState } from "react";
import Student_NavBar from "../../components/Student_NavBar";
import { Button, Container, Form, Row } from "react-bootstrap";
import "../../styles/Admin_UsersManagement.css";
import { getProfile, getStudentID } from "../../service/userService";

export default function Student_UserProfile() {
  const [fullName, setFullName] = useState();
  const [dob, setDOB] = useState();
  const [email, setEmail] = useState();
  const [studentID, setStudentID] = useState();
  const [isEditMode, setEditMode] = useState(false);
  const [isChangePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditMapping, setEditMapping] = useState(false);

  const role = "student";
  // sessionStorage.getItem("user").Type;

  // useEffect(() => {
  //   fetchGeneralData();
  //   if (role == "student") fetchStudentID();
  // }, []);

  const fetchGeneralData = async () => {
    const user = await getProfile();

    setFullName(user.fullName);
    setDOB(user.dob);
    setEmail(user.email);
    setRole(user.Type);
  };

  const fetchStudentID = async () => {
    const studentID = await getStudentID();
    setStudentID(studentID);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fullName);
    console.log(email);
    console.log(dob);
    console.log(gender);
    console.log(isEditMode);
  };

  const handleSubmit_passwordForm = (event) => {
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

  const handleChangePasswordClick = () => {
    setChangePassword(!isChangePassword);
  };

  const handleEditMapping = () => {
    setEditMapping(!isEditMapping);
  };

  const handleSubmit_StudentIDMapForm = () => {
    const URL = ``;
  };

  return (
    <div>
      <Student_NavBar />
      <Row className=" d-flex flex-column align-items-center">
        <Container className="table-container d-flex flex-column">
          <Form onSubmit={handleSubmit} className="detail-form bg-white">
            <h1 style={{ marginLeft: "30px" }}>General Information</h1>
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
                <Form.Label className="user-label">Email</Form.Label>
                <Form.Control
                  className="user-input"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  readOnly={!isEditMode}
                ></Form.Control>
              </Form.Group>
            </Container>
            {isEditMode ? (
              <Button className="btn-detail" onClick={handleEditClick}>
                Save
              </Button>
            ) : (
              <Button
                className="btn-detail"
                type="submit"
                onClick={handleEditClick}
              >
                Edit
              </Button>
            )}
          </Form>

          <Form
            onSubmit={handleSubmit_passwordForm}
            className="account-form bg-white"
          >
            <h1 style={{ marginLeft: "30px" }}>Account</h1>
            <Container className="d-flex flex-column ">
              <Form.Group>
                <Form.Label className="user-label">Email</Form.Label>
                <Form.Control
                  className="user-input"
                  type="text"
                  value={email}
                  readOnly={false}
                ></Form.Control>
              </Form.Group>

              {isChangePassword ? (
                <>
                  <Form.Group>
                    <Form.Label className="user-label">
                      Current Password
                    </Form.Label>
                    <Form.Control
                      className="user-input"
                      type="password"
                      value={currentPassword}
                      onChange={(event) =>
                        setCurrentPassword(event.target.value)
                      }
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="user-label">New Password</Form.Label>
                    <Form.Control
                      className="user-input"
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="user-label">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      className="user-input"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                    ></Form.Control>
                  </Form.Group>
                </>
              ) : (
                <Form.Group>
                  <Form.Label className="user-label">Password</Form.Label>
                  <Form.Control
                    className="user-input"
                    type="password"
                    value="********"
                    onChange={(event) => setPassword(event.target.value)}
                    readOnly={!isChangePassword}
                  ></Form.Control>
                </Form.Group>
              )}
            </Container>
            {isChangePassword ? (
              <Button onClick={handleChangePasswordClick}>Save</Button>
            ) : (
              <Button
                className="btn-account"
                type="submit"
                onClick={handleChangePasswordClick}
              >
                Change Password
              </Button>
            )}
          </Form>

          {role == "student" ? (
            <Form
              id="studentMapping"
              onSubmit={handleSubmit_StudentIDMapForm}
              className="account-form bg-white"
            >
              <h1 style={{ marginLeft: "30px" }}>Mapping Student ID</h1>
              <Container className="d-flex flex-column ">
                <Form.Group>
                  <Form.Label className="user-label">Student ID</Form.Label>
                  <Form.Control
                    className="user-input"
                    type="text"
                    value={studentID}
                    readOnly={!isEditMapping}
                  ></Form.Control>
                </Form.Group>
              </Container>

              {isEditMapping ? (
                <Button className="btn-detail" onClick={handleEditMapping}>
                  Map
                </Button>
              ) : (
                <Button
                  className="btn-detail"
                  type="submit"
                  form="studentMapping"
                  onClick={handleEditMapping}
                >
                  Edit
                </Button>
              )}
            </Form>
          ) : (
            <></>
          )}
        </Container>
      </Row>
    </div>
  );
}
