import React from "react";
import { Alert, Container } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

const RoleBasedGuard = ({ children, accessibleRoles }) => {
  const { user } = useAuth();
  console.log("user:", user);
  if (!accessibleRoles.includes(user?.Type)) {
    return (
      <Container>
        <Alert variant="danger">
          <Alert.Heading>Permission Denied</Alert.Heading>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
};

export default RoleBasedGuard;
