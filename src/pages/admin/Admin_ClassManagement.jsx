import React, { useEffect, useState } from "react";
import Admin_NavBar from "../../components/Admin_NavBar";
import "../../styles/Admin_UsersManagement.css";
import {
  Form,
  FormControl,
  Button,
  Container,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import axios from "axios";

export default function Admin_ClassManagement({ disabled }) {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState(null);
  const [filterID, setFilterID] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [isFilter, setIsFilter] = useState(false);

  const fetchData = async () => {
    const URL =
      "https://advancedweb-finalproject-educat-be.onrender.com/classes";
    try {
      const response = await fetch(URL);

      const data = await response.json();
      console.log(data);

      if (data) {
        setData(data);
        setFilteredData(data);
      } else {
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // console.log("Data:", data);
    // console.log("Filtered Data:", filteredData);
  }, []);

  const ItemClickHandle = (index) => {
    if (disabled) return;
    const path = `/admin/class-detail/${data[index].class_id}`;
    navigate(path);
  };

  const handleSort = (property) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortBy(property);
    setSortOrder(order);

    const sortedData = isFilter ? filteredData : data;

    const sortedItems = _.orderBy(sortedData, [property], [order]);
    setFilteredData(sortedItems);

    if (clickCount === 2) {
      setSortBy(null);
      setSortOrder("asc");
      setClickCount(0);
      setFilteredData(filteredData);
    } else {
      setClickCount(clickCount + 1);
    }
  };

  const handleFilter = () => {
    event.preventDefault();

    setIsFilter(true);
    let filteredItems = [...data];
    console.log(filteredItems);

    // if (filterCreatedBy) {
    //   filteredItems = filteredItems.filter((item) =>
    //     item.createdBy.toLowerCase().includes(filterCreatedBy.toLowerCase())
    //   );
    // }

    if (filterID !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.class_id === parseInt(filterID, 10)
      );
    }

    // if (filterMinParticipants !== "") {
    //   filteredItems = filteredItems.filter(
    //     (item) => item.participants >= parseInt(filterMinParticipants, 10)
    //   );
    // }

    // if (filterMaxParticipants !== "") {
    //   filteredItems = filteredItems.filter(
    //     (item) => item.participants <= parseInt(filterMaxParticipants, 10)
    //   );
    // }

    if (filterStatus !== "all") {
      filteredItems = filteredItems.filter(
        (item) => item.status === filterStatus
      );
    }

    setFilteredData(filteredItems);
    console.log(filteredData);
  };

  const handleResetFilter = () => {
    setFilterCreatedBy("");
    setFilterID("");
    setFilterMinParticipants("");
    setFilterMaxParticipants("");
    setFilterStatus("all");
    setIsFilter(false);
    setFilteredData(data);
    console.log(filteredData);
  };

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
              onChange={(e) => setFilterCreatedBy(e.target.value)}
            />
            <Button type="submit" variant="custom">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </Form>
        </Container>

        <Container className="search-container">
          <h1>Filter</h1>
          <Form
            id="filter-form"
            className="d-flex flex-wrap justify-content-between  "
          >
            <Form.Group className="d-flex align-items-center">
              <Form.Label className="filter-label align-middle">ID</Form.Label>
              <Form.Control
                type="text"
                className="filter-field"
                value={filterID}
                onChange={(event) => setFilterID(event.target.value)}
              />
            </Form.Group>

            {/* <Form.Group className="d-flex align-items-center">
              <Form.Label className="filter-label align-middle ">
                Created by
              </Form.Label>
              <Form.Control
                type="text"
                className="filter-field"
                value={filterCreatedBy}
                onChange={(event) => setFilterCreatedBy(event.target.value)}
              />
            </Form.Group> */}

            {/* <Form.Group className="d-flex align-items-center">
              <Form.Label className="filter-label align-middle ">
                Participants
              </Form.Label>
              <Form.Control
                type="text"
                style={{ width: "190px", marginRight: "20px" }}
                placeholder="Min"
                value={filterMinParticipants}
                onChange={(event) =>
                  setFilterMinParticipants(event.target.value)
                }
              />
              <Form.Control
                type="text"
                style={{ width: "190px" }}
                placeholder="Max"
                value={filterMaxParticipants}
                onChange={(event) =>
                  setFilterMaxParticipants(event.target.value)
                }
              />
            </Form.Group> */}

            <Form.Group className="d-flex align-items-center">
              <Form.Label className="filter-label align-middle ">
                Status
              </Form.Label>
              <Form.Select
                defaultValue="all"
                className="filter-field"
                value={filterStatus}
                onChange={(event) => setFilterStatus(event.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
          <Button
            style={{ marginRight: "20px" }}
            form="filter-form"
            variant="primary"
            onClick={(event) => handleFilter(event)}
          >
            Apply
          </Button>
          <Button onClick={handleResetFilter}>Reset</Button>
        </Container>

        <div
          className="table-container"
          style={{ maxHeight: "700px", overflowY: "scroll" }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th onClick={() => handleSort("class_name")}>
                  Class Name{" "}
                  {sortBy === "class_name" && sortOrder === "asc" && "▲"}
                  {sortBy === "class_name" && sortOrder === "desc" && "▼"}
                </th>
                <th onClick={() => handleSort("class_id")}>
                  Class ID {sortBy === "class_id" && sortOrder === "asc" && "▲"}
                  {sortBy === "class_id" && sortOrder === "desc" && "▼"}
                </th>
                <th onClick={() => handleSort("invite_code")}>
                  Class Code{" "}
                  {sortBy === "invite_code" && sortOrder === "asc" && "▲"}
                  {sortBy === "invite_code" && sortOrder === "desc" && "▼"}
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} onClick={() => ItemClickHandle(index)}>
                  <td>{row.class_name}</td>
                  <td>{row.class_id}</td>
                  <td>{row.invite_code}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
