import React, { useEffect, useState } from "react";
import Student_NavBar from "../../components/Student_NavBar";
import "../../styles/Admin_ClassDetail.css";
import { Table, Row, Col, Nav, Tab, Form, Button } from "react-bootstrap";
import ScrollableTable from "../../components/ScrollableTable";
import { DndProvider } from "react-dnd";
import DragAndDropRow from "../../components/DragAndDropRow";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CSVLink } from "react-csv";
import CSVReader from "react-csv-reader";
import { FormGroup } from "react-bootstrap/esm";

// const CsvUploader = ({ onCsvUpload }) => {
//   const handleCsvUpload = (data) => {
//     const header = data[0].data;
//     const studentIdIndex = header.indexOf("studentID");
//     const fullNameIndex = header.indexOf("fullName");

//     if (studentIdIndex !== -1 && fullNameIndex !== -1) {
//       const newStudents = data.slice(1).map((row) => ({
//         fullName: row.data[fullNameIndex],
//         studentID: row.data[studentIdIndex],
//       }));

//       if (onCsvUpload && typeof onCsvUpload === "function") {
//         onCsvUpload(newStudents);
//       }
//     } else {
//       console.error("CSV file must contain headers: studentID, fullName");
//     }
//   };

//   const buttonRef = React.createRef();

//   const handleOpenDialog = (e) => {
//     if (buttonRef.current) {
//       buttonRef.current.open(e);
//     }
//   };

//   return (
//     <>
//       <CSVReader
//         onFileLoaded={handleCsvUpload}
//         onError={(error) => console.error("CSV Load Error:", error)}
//         noClick
//         noDrag
//       >
//         {({ file }) => (
//           <Button onClick={() => handleOpenDialog(file)}>
//             Upload Student List
//           </Button>
//         )}
//       </CSVReader>
//     </>
//   );
// };

const ExportCsvFile = ({ list }) => {
  const students = list.filter((user) => user.role === "student");

  const headers = ["StudentID", "Full Name"];
  const data = students.map((student) => [student.studentID, student.fullName]);

  return (
    <CSVLink data={data} headers={headers} filename="student_list.csv">
      <Button>Export Student list</Button>
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
      email: "ndnien@gmail.com",
      studentID: "20127060",
    },
    {
      id: "02",
      avatar: "N",
      fullName: "Nguyen Duy ",
      role: "student",
      status: "active",
      email: "ndnien@gmail.com",
      studentID: "20127061",
    },
    {
      id: "03",
      avatar: "N",
      fullName: "Nguyen  Nien",
      role: "student",
      status: "active",
      email: "ndnien@gmail.com",
      studentID: "20127062",
    },
    {
      id: "04",
      avatar: "N",
      fullName: " Duy Nien",
      role: "student",
      status: "active",
      email: "ndnien@gmail.com",
      studentID: "20127063",
    },
  ];

  const grade_list = [
    { name: "A", percentage: 50 },
    { name: "B", percentage: 40 },
    { name: "C", percentage: 10 },
  ];

  const classOwner = class_detail.createdBy;
  const user = "Nguyen Duy Nien";

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

  const fileInputRef = React.useRef();

  useEffect(() => {
    if (activeTab === "fourth" && !isChanged) {
      console.log(gradeBoard);
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

  const handleFileInputChange = (event) => {
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

  const handleGradeInputChange = (studentIndex, gradeIndex, value) => {
    const updatedGradeBoard = [...gradeBoard];
    updatedGradeBoard[studentIndex].gradeList[gradeIndex].point = parseInt(
      value,
      10
    );
    setGradeBoard(updatedGradeBoard);
    setIsChanged(true);
  };

  const totalGradeLogic = (row) => {
    const gradeList = row.gradeList;
    var result = 0;
    gradeList.map(
      (value, index) => (result += (value.point * value.percentage) / 100)
    );

    return result;
  };

  const handleFinalize = () => {};

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Student_NavBar />
        <div className="d-flex flex-column mx-5">
          <h1>{class_detail.className}</h1>
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
                          value={class_detail.className}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="class-label">
                          Main teacher
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={class_detail.createdBy}
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
                          value={class_detail.description}
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
                            onChange={(e) => handleFileInputChange(e)}
                            ref={fileInputRef}
                          />
                          <Button
                            variant="primary"
                            onClick={() => fileInputRef.current.click()}
                          >
                            Choose CSV File
                          </Button>
                        </div>
                        <ExportCsvFile list={user_list} />
                      </>
                    ) : (
                      <></>
                    )}
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Student ID</th>
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
                            <th>{value.total}</th>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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
