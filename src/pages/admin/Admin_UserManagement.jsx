import React, { useEffect, useRef, useState } from "react";
import Admin_NavBar from "../../components/Admin_NavBar";
import "../../styles/Admin_UsersManagement.css";
import { Form, FormControl, Button, Container } from "react-bootstrap";
import ScrollableTable from "../../components/ScrollableTable";
import axios from "axios";

export default function Admin_UserManagement() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [userList]);

  const fetchData = async () => {
    const URL = "https://advancedweb-finalproject-educat-be.onrender.com/users";
    const URL_students =
      "https://advancedweb-finalproject-educat-be.onrender.com/students";
    try {
      const response_students = await axios.get(URL_students);
      const students = await response_students.data;

      const response = await axios.get(URL);
      const data = response.data;
      if (data) {
        const newUserList = data.map((value) => {
          const userEntry = {
            user_id: value.id,
            studentID: students.find((student) => student.user_id === value.id)
              ?.student_id,
            fullName: value.fullname,
            email: value.email,
            Type: value.Type,
            status: value.status,
          };

          return userEntry;
        });
        setUserList(newUserList);
      }
    } catch (e) {
      console.log("Failed to load userList: ", e);
    }
  };

  const fileInputRef = useRef(null);

  const handleUploadExcelFile = () => {
    const file = fileInputRef.current.files[0];

    if (file) {
      console.log("Selected file:", file);
      // Add your file upload logic here
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
      <Admin_NavBar></Admin_NavBar>
      <div className="body-container d-flex flex-column align-items-center ">
        <Container className="search-container d-flex align-items-center">
          <Form className="search-bar d-flex" inline>
            <FormControl
              type="text"
              name="searchTerm"
              placeholder="Search"
              className="mr-sm-2 w-8 searchBar"
            />
            <Button type="submit" variant="custom">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </Form>
          {/* Add the file input */}
          <label htmlFor="fileInput" className="custom-file-upload">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </label>
          <input
            id="fileInput"
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleUploadExcelFile}
          />
        </Container>
        <ScrollableTable items={userList}></ScrollableTable>
      </div>
    </div>
  );
}
