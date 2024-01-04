import React, { useRef } from "react";
import Admin_NavBar from "../../components/Admin_NavBar";
import "../../styles/Admin_UsersManagement.css";
import { Form, FormControl, Button, Container } from "react-bootstrap";
import ScrollableTable from "../../components/ScrollableTable";

export default function Admin_UserManagement() {
  const user_list = [
    {
      id: "01",
      avatar: "N",
      fullName: "Nguyen Duy Nien",
      role: "student",
      status: "active",
      email: "ndnien@gmail.com",
    },
  ];

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
        <ScrollableTable items={user_list}></ScrollableTable>
      </div>
    </div>
  );
}
