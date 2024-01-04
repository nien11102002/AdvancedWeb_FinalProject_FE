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

export default function Admin_ClassManagement({ disabled }) {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState(null);
  const [filterID, setFilterID] = useState("");
  const [filterCreatedBy, setFilterCreatedBy] = useState("");
  const [filterMinParticipants, setFilterMinParticipants] = useState("");
  const [filterMaxParticipants, setFilterMaxParticipants] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    fetchData();
    console.log(data);
    console.log(filteredData);
    console.log(items);
  }, []);

  const fetchData = () => {
    setData([...items]);
    setFilteredData(items);
  };

  useEffect(() => {
    console.log("Data:", data);
    console.log("Filtered Data:", filteredData);
  }, [data, filteredData]);

  const ItemClickHandle = (index) => {
    if (disabled) return;
    const path = `/admin/class-detail/${data[index].classID}`;
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

    if (filterCreatedBy) {
      filteredItems = filteredItems.filter((item) =>
        item.createdBy.toLowerCase().includes(filterCreatedBy.toLowerCase())
      );
    }

    if (filterID) {
      filteredItems = filteredItems.filter((item) =>
        item.classID.toLowerCase().includes(filterID.toLowerCase())
      );
    }

    if (filterMinParticipants !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.participants >= parseInt(filterMinParticipants, 10)
      );
    }

    if (filterMaxParticipants !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.participants <= parseInt(filterMaxParticipants, 10)
      );
    }

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

  const items = [
    {
      classID: "01",
      className: "Data Structure and Algorithms",
      createdBy: "Nguyễn Duy Niên",
      participants: 40,
      status: "active",
    },
    {
      classID: "02",
      className: "A",
      createdBy: "Nguyễn Duy Niên",
      participants: 45,
      status: "deactive",
    },
    {
      classID: "03",
      className: "N",
      createdBy: "Nguyễn Duy Niên",
      participants: 30,
      status: "active",
    },
    {
      classID: "04",
      className: "C",
      createdBy: "Nguyễn Duy Niên",
      participants: 20,
      status: "active",
    },
    {
      classID: "05",
      className: "B",
      createdBy: "Nguyễn Duy Niên",
      participants: 50,
      status: "active",
    },
    {
      classID: "06",
      className: "W",
      createdBy: "Nguyễn Duy Niên",
      participants: 35,
      status: "deactive",
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
            <Form.Group className="d-flex align-items-center">
              <Form.Label className="filter-label align-middle ">
                Created by
              </Form.Label>
              <Form.Control
                type="text"
                className="filter-field"
                value={filterCreatedBy}
                onChange={(event) => setFilterCreatedBy(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="d-flex align-items-center">
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
            </Form.Group>
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
                <th onClick={() => handleSort("className")}>
                  Class Name{" "}
                  {sortBy === "className" && sortOrder === "asc" && "▲"}
                  {sortBy === "className" && sortOrder === "desc" && "▼"}
                </th>
                <th onClick={() => handleSort("classID")}>
                  Class ID {sortBy === "classID" && sortOrder === "asc" && "▲"}
                  {sortBy === "classID" && sortOrder === "desc" && "▼"}
                </th>
                <th onClick={() => handleSort("createdBy")}>
                  Created by{" "}
                  {sortBy === "createdBy" && sortOrder === "asc" && "▲"}
                  {sortBy === "createdBy" && sortOrder === "desc" && "▼"}
                </th>
                <th onClick={() => handleSort("participants")}>
                  Participants{" "}
                  {sortBy === "participants" && sortOrder === "asc" && "▲"}
                  {sortBy === "participants" && sortOrder === "desc" && "▼"}
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} onClick={() => ItemClickHandle(index)}>
                  <td>{row.className}</td>
                  <td>{row.classID}</td>
                  <td>{row.createdBy}</td>
                  <td>{row.participants}</td>
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
