import React, { useEffect, useState } from "react";
import Student_NavBar from "../../components/Student_NavBar";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import "../../styles/Student_Notification.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Student_Notification({}) {
  const mail = [
    {
      id: "01",
      title: "Data Structure and Algorithms",
      date: "2023-12-31T12:30:45",
      body: "Data Structure and AlgorithmsData Structure and AlgorithmsData Structure and AlgorithmsvData Structure and AlgorithmsData Structure and AlgorithmsData Structure and AlgorithmsvData Structure and Algorithms",
      sentBy: "Nguyễn Duy Niên",
    },
    {
      id: "02",
      title: "Data Structure and Algorithms",
      date: "2023-12-31T12:30:45",
      body: "02",
      sentBy: "Nguyễn Duy Niên",
    },
    {
      id: "03",
      title: "Data Structure and Algorithms Data Structure and Algorithms",
      date: "2023-12-31T12:30:45",
      body: "03",
      sentBy: "Nguyễn Duy Niên",
    },
    {
      id: "04",
      title: "Data Structure and Algorithms",
      date: "2023-12-31T12:30:45",
      body: "04",
      sentBy: "Nguyễn Duy Niên",
    },
  ];

  let { ID } = useParams();
  console.log(ID);
  const [defaultTabKey, setDefaultTabKey] = useState(String(ID) || "01");
  const [loading, setLoading] = useState(true);
  const [selectedMail, setSelectedMail] = useState({
    id: "",
    title: "",
    date: "",
    body: "",
    sentBy: "",
  });
  const [mailID, setMailID] = useState("");
  const [mails, setMails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMails(mail);
  }, []);

  useEffect(() => {
    setDefaultTabKey(String(ID) || "01");
    if (ID && mails.length > 0) {
      const foundMail = mails.find((mail) => mail.id === String(ID));
      if (foundMail) {
        setSelectedMail(foundMail);
      } else {
        console.error(`Mail with ID ${ID} not found`);
      }
    }
  }, [ID, mails]);

  const handleMailClick = (event) => {
    const selectedMailID = event.currentTarget.getAttribute(
      "data-rr-ui-event-key"
    );
    const chosenMail = mails[selectedMailID];
    const body = chosenMail.body;
    setMailID(String(selectedMailID));
    setSelectedMail({
      id: chosenMail.id,
      title: chosenMail.title,
      date: chosenMail.date,
      body: body,
      sentBy: chosenMail.sentBy,
    });
    navigate(`/student/notification/${chosenMail.id}`);
  };

  return (
    <div>
      <Student_NavBar />
      <Tab.Container id="left" defaultActiveKey={defaultTabKey}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {mails.map((value, index) => {
                return (
                  <Nav.Item key={index} className="mail-item">
                    <Nav.Link eventKey={index} onClick={handleMailClick}>
                      <Card
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <Card.Title>{value.sentBy}</Card.Title>
                        <Card.Header className="mail-header">
                          {value.title}
                        </Card.Header>
                        <Card.Footer style={{ textAlign: "end" }}>
                          {value.date}
                        </Card.Footer>
                      </Card>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content className="mail-content">
              <Tab.Pane eventKey={mailID}>
                {selectedMail ? (
                  <div>
                    <div className="d-flex justify-content-between ">
                      <div>{selectedMail.title}</div>
                      <div>{selectedMail.date}</div>
                    </div>
                    <div>Sent by: {selectedMail.sentBy}</div>
                    <hr />

                    <div>{selectedMail.body}</div>
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
