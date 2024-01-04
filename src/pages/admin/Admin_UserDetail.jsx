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
    username: "nien11102002",
    studentID: "20127060",
  };

  const [fullName, setFullName] = useState(user.fullName);
  const [dob, setDOB] = useState(user.dob);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [isEditMode, setEditMode] = useState(false);
  const [isChangePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentID, setStudentID] = useState("");

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

  const handleMappingStudentID = () => {};

  return (
    <div>
      <Admin_NavBar></Admin_NavBar>

      <Row className="content">
        <Col xs={4}>
          <div className="left-container">
            <div className="d-flex flex-column avatar-container">
              <Container
                style={{ width: "250px", height: "250px" }}
                className="img bg-white"
              >
                <Image className="avatar" src={avatar}></Image>
              </Container>

              <Button className="btn-editAvatar">Change Avatar</Button>
            </div>
          </div>
        </Col>
        <Col xs={8}>
          <div className="table-container">
            <Form onSubmit={handleSubmit} className="detail-form bg-white">
              <div className="d-flex justify-content-between">
                <h1>General Information</h1>
                <Button>Ban</Button>
              </div>
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
              {isEditMode ? (
                <Button onClick={handleEditClick}>Save</Button>
              ) : (
                <Button type="submit" onClick={handleEditClick}>
                  Edit
                </Button>
              )}
            </Form>

            {/* Account Form */}
            <Form
              onSubmit={handleSubmit_passwordForm}
              className="account-form bg-white"
            >
              <h1 style={{ marginLeft: "30px" }}>Account</h1>
              <Container className="d-flex flex-column ">
                <Form.Group>
                  <Form.Label className="user-label">Username</Form.Label>
                  <Form.Control
                    className="user-input"
                    type="text"
                    value={user.username}
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
                      <Form.Label className="user-label">
                        New Password
                      </Form.Label>
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
                <Button
                  className="btn-account"
                  onClick={handleChangePasswordClick}
                >
                  Save
                </Button>
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

            {/* Mapping StudentID and Account */}
            <Form className="account-form bg-white">
              <h1 style={{ marginLeft: "30px" }}>Mapping StudentID</h1>
              <Form.Group className="d-flex">
                <Form.Label
                  style={{ marginLeft: "30px" }}
                  className="user-label"
                >
                  Student ID
                </Form.Label>
                <Form.Control
                  className="user-input"
                  type="text"
                  value={studentID}
                  onChange={(event) => setStudentID(event.target.value)}
                />
              </Form.Group>
              <Button className="btn-account" onClick={handleMappingStudentID}>
                Mapping
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
