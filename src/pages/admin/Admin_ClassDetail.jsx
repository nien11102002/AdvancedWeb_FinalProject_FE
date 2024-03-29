import React, { useEffect, useState } from "react";
import Admin_NavBar from "../../components/Admin_NavBar";
import { Container, Row, Col, Nav, Button, Form, Tab } from "react-bootstrap";
import "../../styles/Admin_ClassDetail.css";
import ScrollableTable from "../../components/ScrollableTable";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Admin_ClassDetail() {
  const description_row = 8;

  const [userList, setUserList] = useState([]);
  const [course, setCourse] = useState({});
  const [isEditMode, setEditMode] = useState(false);
  const [className, setClassName] = useState();
  const [status, setStatus] = useState();
  const [description, setDescription] = useState();
  const [inviteCode, setInviteCode] = useState();

  const { class_id } = useParams();

  const fetchPartipants = async () => {
    var ID;
    const URL_classMembers =
      "https://advancedweb-finalproject-educat-be.onrender.com/class-members";
    const URL_students =
      "https://advancedweb-finalproject-educat-be.onrender.com/students";

    try {
      const response_classMembers = await fetch(URL_classMembers);
      const response_students = await fetch(URL_students);
      const classMembers = await response_classMembers.json();
      const students = await response_students.json();

      if (classMembers && students) {
        classMembers.filter((member) => member.class_id == class_id);
      }
      const filteredClassMembers = classMembers.filter(
        (member) => member.class_id === class_id
      );

      const studentIDs = filteredClassMembers.map(
        (member) => member.student_id
      );

      const matchingStudents = students.filter((student) =>
        studentIDs.includes(student.student_id)
      );

      const userIDs = matchingStudents.map((student) => student.user_id);

      const userPromises = userIDs.map(async (userID) => {
        const URL_userByIDBase = `https://advancedweb-finalproject-educat-be.onrender.com/users/`;
        const response = await fetch(`${URL_userByIDBase}${userID}`);
        const userData = await response.json();

        const userEntry = {
          user_id: userData.id,
          studentID: matchingStudents.find(
            (student) => student.user_id === userID
          )?.student_id,
          fullName: userData.fullname,
          email: userData.email,
          Type: userData.Type,
          status: userData.status,
        };
        return userEntry;
      });

      const usersData = await Promise.all(userPromises);
      setUserList(usersData);
    } catch (errors) {
      console.log("Errors in Participants fetch: ", errors);
    }
  };

  const fetchData = async () => {
    const URL = `
    https://advancedweb-finalproject-educat-be.onrender.com/classes/${class_id}`;

    try {
      const response = await fetch(URL);

      const data = await response.json();
      if (data) {
        setCourse(data);
        setClassName(data.class_name);
        setStatus(data.status);
        setDescription(data.description);
        setInviteCode(data.invite_code);
      } else {
        setCourse([]);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

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

  useEffect(() => {
    fetchData();
    fetchPartipants();
  }, []);

  const handleEditClick = () => {
    setEditMode(!isEditMode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditMode) {
      const updatedTime = getCurrentTimestamp();

      const updatedCourse = {
        class_name: className,
        class_id: course.class_id,
        created_at: course.created_at,
        updated_at: updatedTime,
        invite_code: inviteCode,
        invite_link: course.invite_link,
        status: status,
        description: description,
      };
      console.log(updatedCourse);

      const URL = `https://advancedweb-finalproject-educat-be.onrender.com/classes/${course.class_id}`;
      try {
        const response = await axios.patch(URL, updatedCourse);

        const data = response.data;
        console.log(data);
        fetchData();
      } catch (error) {
        console.error("Error during edit class:", error);
      }
    }
  };

  return (
    <div>
      <Admin_NavBar />
      <Container>
        <h1>{course.className}</h1>
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
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Form onSubmit={(event) => handleSubmit(event)}>
                    <Form.Group>
                      <Form.Label className="class-label">
                        Class Name
                      </Form.Label>
                      <Form.Control
                        className="class-input"
                        type="text"
                        value={className}
                        onChange={(event) => setClassName(event.target.value)}
                        readOnly={!isEditMode}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="class-label">
                        Invite Code
                      </Form.Label>
                      <Form.Control
                        className="class-input"
                        type="text"
                        value={inviteCode}
                        onChange={(event) => setInviteCode(event.target.value)}
                        readOnly={!isEditMode}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="class-label">
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={description_row}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        disabled={!isEditMode}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="class-label">Status</Form.Label>
                      <Form.Select
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        disabled={!isEditMode}
                      >
                        <option value="active">Active</option>
                        <option value="deactive">Deactive</option>
                      </Form.Select>
                    </Form.Group>

                    {isEditMode ? (
                      <Button type="submit" onClick={handleEditClick}>
                        Save
                      </Button>
                    ) : (
                      <Button type="submit" onClick={handleEditClick}>
                        Edit
                      </Button>
                    )}
                  </Form>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <ScrollableTable items={userList}></ScrollableTable>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}
