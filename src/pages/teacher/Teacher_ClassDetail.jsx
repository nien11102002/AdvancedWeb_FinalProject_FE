import React, { useEffect, useState } from "react";
import Student_NavBar from "../../components/Student_NavBar";
import "../../styles/Admin_ClassDetail.css";
import "../../styles/Teacher_ClassDetail.css";
import { Table, Row, Col, Nav, Tab, Form, Button } from "react-bootstrap";
import ScrollableTable from "../../components/ScrollableTable";
import { DndProvider } from "react-dnd";
import DragAndDropRow from "../../components/DragAndDropRow";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CSVLink } from "react-csv";
import { useParams } from "react-router-dom";

const ExportCsvFile = ({ list }) => {
  const students = list.filter((user) => user.role === "student");

  const headers = ["studentID", "fullName"];
  const data = students.map((student) => [student.studentID, student.fullName]);

  return (
    <CSVLink data={data} headers={headers} filename="student_list.csv">
      <Button>Export Student list</Button>
    </CSVLink>
  );
};

const ExportCsvGradeBoard = ({ gradeBoard, totalGradeLogic, emails }) => {
  var headers, data;
  if (gradeBoard) {
    const gradesHeader =
      gradeBoard[0]?.gradeList?.map(
        (value) => `${value.name} (${value.percentage}%)`
      ) || [];
    headers = [
      "studentID",
      "studentAccount",
      "fullName",
      ...gradesHeader,
      "Total",
    ];
    const gradesData = gradeBoard.map(
      (value) => value.gradeList?.map((grade) => grade.point) || []
    );
    data = gradeBoard.map((value, index) => [
      value.studentID,
      emails[value.studentID] || "",
      value.fullName,
      ...(gradesData[index] || []),
      totalGradeLogic(value),
    ]);
  }

  return (
    <CSVLink data={data} headers={headers} filename="grade_board.csv">
      <Button>Export Grade Board</Button>
    </CSVLink>
  );
};

const DownloadTemplate = ({ grades, students }) => {
  const headers = [
    "studentID",
    ...grades.map((value) => `${value.name} (${value.percentage}%)`),
  ];
  const data = students.map((student) => [
    student.studentID,
    ...grades.map(() => ""),
  ]);

  return (
    <CSVLink data={data} headers={headers} filename="template.csv">
      <Button>Download Template</Button>
    </CSVLink>
  );
};

export default function Teacher_ClassDetail({ id }) {
  const description_row = 8;
  const class_detail = {
    className: "Data Structure and Algorithms",
    createdBy: "Nguyen Duy Nien",
    participants: 40,
    status: "deactive",
    description:
      "a fundamental subject in computer science and programming. It focuses on the study of organizing and manipulating data efficiently, as well as designing and analyzing algorithms for solving computational problems.",
  };

  const user_list = [
    {
      id: "01",
      avatar: "N",
      fullName: "Nguyen Duy Nien",
      role: "teacher",
      status: "active",
      email: "ndnien1@gmail.com",
      studentID: "20127060",
    },
    {
      id: "02",
      avatar: "N",
      fullName: "Nguyen Duy ",
      role: "student",
      status: "active",
      email: "ndnien2@gmail.com",
      studentID: "20127061",
    },
    {
      id: "03",
      avatar: "N",
      fullName: "Nguyen  Nien",
      role: "student",
      status: "active",
      email: "ndnien3@gmail.com",
      studentID: "20127062",
    },
    {
      id: "04",
      avatar: "N",
      fullName: " Duy Nien",
      role: "student",
      status: "active",
      email: "ndnien4@gmail.com",
      studentID: "20127063",
    },
  ];

  const grade_list = [
    { name: "A", percentage: 50 },
    { name: "B", percentage: 40 },
    { name: "C", percentage: 10 },
  ];

  const classOwner = classDetail.createdBy;
  const user = "Nguyen Duy Nien";

  const [classDetail, setClassDetail] = useState({});
  const [initialGrades, setInitialGrades] = useState([]);
  const [grades, setGrades] = useState([{ name: "", percentage: 0 }]);
  const [editable, setEditable] = useState(false);
  const [uploadedStudentList, setUploadedStudentList] = useState([]);
  const [activeTab, setActiveTab] = useState("first");
  const [gradeBoard, setGradeBoard] = useState(() => {
    return uploadedStudentList.map((student) => ({
      studentID: student.studentID,
      fullName: student.fullName,
      gradeList: grades.map((grade) => ({
        name: grade.name,
        percentage: grade.percentage,
        point: 0,
      })),
      total: 0,
    }));
  });
  const [isChanged, setIsChanged] = useState(false);
  const [totalGrades, setTotalGrades] = useState(() => {
    const initialTotalGrades = gradeBoard.map((row) => totalGradeLogic(row));
    return initialTotalGrades;
  });
  const [studentMapping, setStudentMapping] = useState([]);
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState(
    Array(user_list.length).fill("")
  );

  const studentListFileInputRef = React.useRef();
  const gradesFileInputRef = React.useRef();

  const { class_id } = useParams();

  const fetchClassGeneralData = async () => {
    const URL = `https://advancedweb-finalproject-educat-be.onrender.com/classes/${class_id}`;
    try {
      const response = await axios.get(URL);

      const data = response.data;

      if (data) {
        let path;

        navigate(path);
      } else {
        setEmail("");
        setPassword("");
        console.error("Email has already existed!");
      }
    } catch (error) {
      console.error("Error during get class general data:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "fourth" && !isChanged) {
      const newGradeBoard = uploadedStudentList.map((student) => ({
        studentID: student.studentID,
        fullName: student.fullName,
        gradeList: grades.map((grade) => ({
          name: grade.name,
          percentage: grade.percentage,
          point: 0,
        })),
        total: 0,
      }));
      setGradeBoard(newGradeBoard);
    }
  }, [activeTab, uploadedStudentList, grades]);

  useEffect(() => {
    setInitialGrades(grade_list);
    setGrades(grade_list);

    const newEmails = user_list
      .filter((value) => value.role === "student")
      .map((value) => value.email);
    setEmails(newEmails);
  }, []);

  const handleAddRow = () => {
    setGrades([...grades, { name: "", percentage: 0 }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = { ...updatedGrades[index], [field]: value };
    setGrades(updatedGrades);
  };

  const moveRow = (fromIndex, toIndex) => {
    const updatedGrades = [...grades];
    const [removed] = updatedGrades.splice(fromIndex, 1);
    updatedGrades.splice(toIndex, 0, removed);
    setGrades(updatedGrades);
  };

  const deleteRow = (index) => {
    const updatedGrades = grades.filter((grade, i) => i !== index);
    setGrades(updatedGrades);
  };

  const handleSaveGrades = () => {
    const updatedGradeList = [...grades];
    setInitialGrades([...grades]);
    toggleEdit();
  };

  const handleCancel = () => {
    setGrades([...initialGrades]);
    toggleEdit();
  };

  const toggleEdit = () => {
    setEditable(!editable);
  };

  const handleUploadStudentList = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;

        const rows = csvData.split(/\r?\n/).map((row) => row.trim());
        rows.pop();
        const header = rows[0].split(",");
        const studentIdIndex = header.indexOf("studentID");
        const fullNameIndex = header.indexOf("fullName");

        if (studentIdIndex !== -1 && fullNameIndex !== -1) {
          const newStudents = rows.slice(1).map((row) => {
            const columns = row.split(",");
            return {
              studentID: columns[studentIdIndex],
              fullName: columns[fullNameIndex],
            };
          });
          setUploadedStudentList(newStudents);
        } else {
          alert("CSV file must contain headers: studentID, fullName");
        }
      };

      reader.readAsText(selectedFile);
    } else {
      alert("Please select a valid CSV file.");
    }
  };

  const handleUploadGrades = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === "text/csv") {
      if (gradeBoard) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const csvData = e.target.result;

          const rows = csvData.split(/\r?\n/).map((row) => row.trim());
          rows.pop();
          const header = rows[0].split(",");
          const studentIdIndex = header.indexOf("studentID");
          console.log(rows);
          const gradeIndices = grades.map((grade) =>
            header.indexOf(`${grade.name} (${grade.percentage}%)`)
          );

          if (
            studentIdIndex !== -1 &&
            gradeIndices.every((index) => index !== -1)
          ) {
            const newGrades = rows.slice(1).map((row) => {
              const columns = row.split(",");
              const studentID = columns[studentIdIndex];
              const uploadedStudent = uploadedStudentList.find(
                (student) => student.studentID === studentID
              );

              if (uploadedStudent) {
                const fullName = uploadedStudent.fullName;
                const gradeList = gradeIndices.map((index) => ({
                  point: index !== -1 ? parseFloat(columns[index]) || 0 : 0,
                  percentage: grades[index]?.percentage || 0,
                }));
                var total = 0;
                gradeList.forEach((value) => {
                  total += value.point * (value.percentage / 100);
                });
                total = Math.round(total * 10) / 10;

                return {
                  studentID,
                  fullName,
                  gradeList,
                  total,
                };
              } else {
                return {
                  studentID,
                  fullName: "",
                  gradeList: [],
                  total: 0,
                };
              }
            });

            setGradeBoard(newGrades);

            const updatedTotalGrades = newGrades.map((row) => row.total);
            setTotalGrades(updatedTotalGrades);
          } else {
            alert(
              "CSV file must contain headers: studentID and grade columns from the template"
            );
          }
        };

        reader.readAsText(selectedFile);
      } else {
        alert("Upload Student List First");
      }
    } else {
      alert("Please select a valid CSV file.");
    }
  };

  const handleGradeInputChange = (studentIndex, gradeIndex, value) => {
    const updatedGradeBoard = [...gradeBoard];
    updatedGradeBoard[studentIndex].gradeList[gradeIndex].point = parseFloat(
      value,
      10
    );
    setGradeBoard(updatedGradeBoard);
    setIsChanged(true);
    const updatedTotalGrades = updatedGradeBoard.map((row) =>
      totalGradeLogic(row)
    );
    setTotalGrades(updatedTotalGrades);
  };

  const totalGradeLogic = (row) => {
    const gradeList = row.gradeList || [];
    var result = 0;

    gradeList.forEach((value) => {
      const point = value?.point || 0;
      result += point * ((value?.percentage || 0) / 100);
    });

    return Math.round(result * 10) / 10;
  };

  const handleFinalize = () => {};

  const handleEmailChange = (selectedEmail, studentIndex) => {
    const newStudentMapping = { ...studentMapping };
    newStudentMapping[gradeBoard[studentIndex].studentID] = selectedEmail;
    setStudentMapping(newStudentMapping);

    const newSelectedEmails = Object.values(newStudentMapping);
    setSelectedEmails(newSelectedEmails);
    console.log(studentMapping);
  };

  const handleSaveGradeBoard = () => {};

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Student_NavBar />
        <div className="d-flex flex-column mx-5">
          <h1>{classDetail.class_name}</h1>
          <Tab.Container
            id="left"
            defaultActiveKey="first"
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
          >
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
                  <Nav.Item>
                    <Nav.Link eventKey="third" style={{ textAlign: "center" }}>
                      Grade Structure
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth" style={{ textAlign: "center" }}>
                      Grade Board
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Form>
                      <Form.Group>
                        <Form.Label className="class-label">
                          Class Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={classDetail.class_name}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="class-label">
                          Main teacher
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={classDetail.createdBy}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="class-label">
                          Participants
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={class_detail.participants}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="class-label">Status</Form.Label>
                        <Form.Control
                          type="text"
                          value={class_detail.status}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="class-label">
                          Description
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={description_row}
                          value={classDetail.description}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </Tab.Pane>

                  <Tab.Pane eventKey="second">
                    <ScrollableTable
                      items={user_list}
                      disabled={true}
                    ></ScrollableTable>
                  </Tab.Pane>

                  <Tab.Pane eventKey="third">
                    <Form>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th></th>
                            <th>Grade Name</th>
                            <th>Grade Percentage</th>
                            {editable ? <th>Action</th> : <></>}
                          </tr>
                        </thead>
                        <tbody>
                          {grades.map((grade, index) => (
                            <DragAndDropRow
                              key={index}
                              index={index}
                              moveRow={moveRow}
                              deleteRow={deleteRow}
                              handleInputChange={handleInputChange}
                              name={grade.name}
                              percentage={grade.percentage}
                              readMode={!editable}
                            />
                          ))}
                        </tbody>
                      </Table>
                      {editable ? (
                        <Button variant="primary" onClick={handleAddRow}>
                          +
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Form>

                    {editable ? (
                      <div style={{ marginTop: "10px" }}>
                        <Button variant="info" onClick={handleSaveGrades}>
                          Save
                        </Button>
                        <Button
                          variant="danger"
                          onClick={handleCancel}
                          style={{ marginLeft: "10px" }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button variant="info" onClick={toggleEdit}>
                        Edit
                      </Button>
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="fourth">
                    {classOwner === user ? (
                      <>
                        <div>
                          <input
                            type="file"
                            accept=".csv"
                            style={{ display: "none" }}
                            onChange={(e) => handleUploadStudentList(e)}
                            ref={studentListFileInputRef}
                          />
                          <Button
                            variant="primary"
                            onClick={() =>
                              studentListFileInputRef.current.click()
                            }
                          >
                            Upload Student List
                          </Button>
                        </div>
                        <ExportCsvFile list={user_list} />
                        <ExportCsvGradeBoard
                          gradeBoard={gradeBoard}
                          totalGradeLogic={totalGradeLogic}
                          emails={studentMapping}
                        />
                        <DownloadTemplate
                          grades={grades}
                          students={uploadedStudentList}
                        />
                        <div>
                          <input
                            type="file"
                            accept=".csv"
                            style={{ display: "none" }}
                            onChange={(e) => handleUploadGrades(e)}
                            ref={gradesFileInputRef}
                          />
                          <Button
                            variant="primary"
                            onClick={() => gradesFileInputRef.current.click()}
                          >
                            Upload Grades
                          </Button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Student ID</th>
                          <th>Student Account</th>
                          <th>Full Name</th>
                          {grades.map((value, index) => (
                            <th key={index}>
                              <Button
                                onClick={handleFinalize}
                                variant="warning"
                              >
                                Finalize
                              </Button>
                              <br />
                              {value.name}
                              <br />
                              <span>&#40;{value.percentage}%&#41;</span>
                            </th>
                          ))}
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gradeBoard?.map((value, studentIndex) => (
                          <tr key={studentIndex}>
                            <th>{studentIndex + 1}</th>
                            <th>{value.studentID}</th>
                            <th>
                              <Form.Select
                                value={
                                  studentMapping[
                                    gradeBoard[studentIndex].studentID
                                  ] || ""
                                }
                                onChange={(e) =>
                                  handleEmailChange(
                                    e.target.value,
                                    studentIndex
                                  )
                                }
                              >
                                <option>Empty</option>
                                {emails.map((value, index) => {
                                  return (
                                    <option value={value} key={index}>
                                      {value}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                            </th>

                            <th>{value.fullName}</th>
                            {grades.map((grade, gradeIndex) => (
                              <th key={gradeIndex}>
                                <Form.Control
                                  type="number"
                                  value={
                                    isNaN(value.gradeList[gradeIndex].point)
                                      ? ""
                                      : value.gradeList[gradeIndex].point
                                  }
                                  onChange={(e) =>
                                    handleGradeInputChange(
                                      studentIndex,
                                      gradeIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </th>
                            ))}
                            <th>{totalGrades[studentIndex]}</th>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Button variant="primary" onClick={handleSaveGradeBoard}>
                      Save
                    </Button>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </DndProvider>
  );
}
