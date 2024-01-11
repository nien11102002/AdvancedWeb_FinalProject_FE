import React, { useEffect, useState } from "react";
import Student_NavBar from "../../components/Student_NavBar";
import { Button, Container, Form, Row } from "react-bootstrap";
import "../../styles/Admin_UsersManagement.css";
import { getProfile, getStudentID } from "../../service/userService";
import axios from "axios";

export default function Student_UserProfile() {
  const [fullName, setFullName] = useState();
  const [dob, setDOB] = useState();
  const [email, setEmail] = useState();
  const [studentID, setStudentID] = useState();
  const [isEditMode, setEditMode] = useState(false);
  const [isChangePassword, setChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditMapping, setEditMapping] = useState(false);
  const [generalInfo, setGeneralInfo] = useState({});
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchGeneralData();
  }, [generalInfo]);

  const fetchGeneralData = async () => {
    const user = await getProfile();

    setGeneralInfo(user);
    setFullName(user.fullname);
    setDOB(user.dob);
    setEmail(user.email);
    setRole(user.Type);
  };

  const fetchStudentID = async () => {
    const studentID = await getStudentID();
    setStudentID(studentID);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    user.fullname = fullName;
    user.dob = dob;

    const URL = `https://advancedweb-finalproject-educat-be.onrender.com/users/${user.id}`;
    try {
      const response = await axios.patch(URL, {
        fullname: user.fullname,
        dob: user.dob,
        email: email,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSubmit_passwordForm = async (event) => {
    event.preventDefault();
    const id = JSON.parse(sessionStorage.getItem("user")).id;
    const URL_password = `https://advancedweb-finalproject-educat-be.onrender.com/users/${id}/password`;
    if (newPassword != null && newPassword == confirmPassword) {
      try {
        const response = await axios.patch(URL_password, {
          password: newPassword,
        });

        console.log(response.data);
      } catch (error) {
        console.error("Error updating password:", error);
      }
    }
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

  const handleSubmit_StudentIDMapForm = async () => {
    const URL = `https://advancedweb-finalproject-educat-be.onrender.com/students`;
    const id = JSON.parse(sessionStorage.getItem("user")).id;
    try {
      const response = await axios.post(URL_password, {
        user_id: id,
        student_id: studentID,
        created_at: "2024-01-10T20:51:41.846Z",
        updated_at: "2024-01-10T20:51:41.846Z",
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error updating password:", error);
    }
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
                <Form.Label className="user-label">Role</Form.Label>
                <Form.Control
                  className="user-input"
                  type="text"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  readOnly={false}
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
              {isChangePassword ? (
                <>
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
                    onChange={(event) => setStudentID(event.target.value)}
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
