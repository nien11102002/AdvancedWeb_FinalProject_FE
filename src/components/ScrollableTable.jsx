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
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((row, index) => (
            <tr key={index} onClick={() => ItemClickHandle(index)}>
              <td>{row.avatar}</td>
              <td>{row.fullName}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
              <td>{row.status}</td>
              <td>{row.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
