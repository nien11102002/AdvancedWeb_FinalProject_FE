import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import "../styles/Admin_UsersManagement.css";
import { useNavigate } from "react-router-dom";

export default function AdminUserTable({ items, disabled }) {
  const navigate = useNavigate();
  const ItemClickHandle = (index) => {
    if (disabled) return;
    const path = `/admin/user-detail/${items[index].id}`;
    navigate(path);
  };

  return (
    <div
      className="table-container"
      style={{ maxHeight: "700px", overflowY: "scroll" }}
    >
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Student ID</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((row, index) => (
            <tr key={index} onClick={() => ItemClickHandle(index)}>
              <td>{row.fullName}</td>
              <td>{row.email}</td>
              <td>{row.Type}</td>
              <td>{row.status}</td>
              <td>{row.studentID}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
