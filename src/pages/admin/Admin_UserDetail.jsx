import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Admin_UserDetail({}) {
  const { id } = useParams();

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
    fetchGeneralInfo();
    fetchStudentID();
  }, [generalInfo]);

  const fetchGeneralInfo = async () => {
    const URL = `https://advancedweb-finalproject-educat-be.onrender.com/users/${id}`;
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      if (data) {
        setGeneralInfo(data);
        setFullName(data.fullname);
        setDOB(data.dob);
        setEmail(data.email);
        setRole(data.Type);
      }
    } catch (e) {
      console.error("Fail to fetch general info: ", e);
    }
  };

  const fetchStudentID = async () => {
    const url = `https://advancedweb-finalproject-educat-be.onrender.com/students/${id}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data) {
        setStudentID(data.student_id);
      }
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const URL = `https://advancedweb-finalproject-educat-be.onrender.com/users/${id}`;
    try {
      const response = await axios.patch(URL, {
        fullname: fullName,
        dob: dob,
        email: email,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSubmit_passwordForm = async (event) => {
    event.preventDefault();
    if (!isChangePassword) {
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
      const response = await axios.postForm(URL_password, {
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

  const handleBan = async () => {
    const URL = `https://advancedweb-finalproject-educat-be.onrender.com/users/${id}`;
    try {
      const response = await axios.patch(URL, {
        isBanned: true,
      });
      const data = await response.data;
    } catch (e) {
      console.error("Fail to ban user: ");
    }
  };

  return (
    <div>
      <Admin_NavBar></Admin_NavBar>

      <Row className="content">
        <Col xs={12}>
          <div className="table-container">
            <Form
              onSubmit={handleSubmit}
              className="detail-form bg-white"
              id="info-form"
            >
              <div className="d-flex justify-content-between">
                <h1>General Information</h1>
                <Button onClick={handleBan}>Ban</Button>
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
                <Form.Label className="user-label">Role</Form.Label>
                <Form.Control
                  className="user-input"
                  type="text"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  readOnly={!isEditMode}
                ></Form.Control>
              </Form.Group>

              {isEditMode ? (
                <Button onClick={handleEditClick}>Save</Button>
              ) : (
                <Button
                  type="submit"
                  form="info-form"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              )}
            </Form>

            {/* Account Form */}
            <Form
              onSubmit={handleSubmit_passwordForm}
              className="account-form bg-white"
              id="password-form"
            >
              <h1>Password</h1>
              <div className="d-flex flex-column ">
                {isChangePassword ? (
                  <>
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
              </div>
              {isChangePassword ? (
                <Button
                  className="btn-account"
                  type="submit"
                  form="password-form"
                  onClick={handleChangePasswordClick}
                >
                  Save
                </Button>
              ) : (
                <Button
                  className="btn-account"
                  type="submit"
                  form="password-form"
                  onClick={handleChangePasswordClick}
                >
                  Change Password
                </Button>
              )}
            </Form>

            {/* Mapping StudentID and Account */}
            <Form
              className="account-form bg-white"
              id="studentMapping"
              onSubmit={handleSubmit_StudentIDMapForm}
            >
              <h1>Mapping StudentID</h1>
              <Form.Group className="d-flex">
                <Form.Label className="user-label">Student ID</Form.Label>
                <Form.Control
                  className="user-input"
                  type="text"
                  value={studentID}
                  onChange={(event) => setStudentID(event.target.value)}
                  readOnly={!isEditMapping}
                />
              </Form.Group>
              {isEditMapping ? (
                <Button className="btn-account" onClick={handleEditMapping}>
                  Map
                </Button>
              ) : (
                <Button
                  className="btn-account"
                  type="submit"
                  form="studentMapping"
                  onClick={handleEditMapping}
                >
                  Edit
                </Button>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
