import React from "react";
import Admin_NavBar from "../../components/Admin_NavBar";
import "../../styles/Admin_UsersManagement.css";
import {
  Form,
  FormControl,
  Button,
  Container,
  ListGroup,
} from "react-bootstrap";
import ScrollableTable from "../../components/ScrollableTable";

export default function Admin_UsersManagement() {
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
        <ScrollableTable items={user_list}></ScrollableTable>
      </div>
    </div>
  );
}
