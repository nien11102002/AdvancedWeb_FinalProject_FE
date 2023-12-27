import React from "react";
import Admin_NavBar from "../../components/Admin_NavBar";
import "../../styles/Admin_UsersManagement.css";
import { Form, FormControl, Button, Container, Table } from "react-bootstrap";

export default function Admin_ClassManagement() {
  const items = [
    {
      classID: "01",
      className: "Data Structure and Algorithms",
      createdBy: "Nguyễn Duy Niên",
      participants: 40,
      status: "active",
    },
  ];
  const ItemClickHandle = () => {};
  return (
    <div>
      <Admin_NavBar></Admin_NavBar>
      <div className="body-container d-flex flex-column align-items-center ">
        <Container className="search-container">
          <Form className="search-bar d-flex" inline>
            <FormControl
              type="text"
              name="searchTerm"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button type="submit" variant="custom">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </Form>
        </Container>
        <div
          className="table-container"
          style={{ maxHeight: "700px", overflowY: "scroll" }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Class ID</th>
                <th>Created by</th>
                <th>Participants</th>
                <th>Status</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((row, index) => (
                <tr key={index} onClick={ItemClickHandle()}>
                  <td>{row.className}</td>
                  <td>{row.classID}</td>
                  <td>{row.createdBy}</td>
                  <td>{row.participants}</td>
                  <td>{row.status}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
