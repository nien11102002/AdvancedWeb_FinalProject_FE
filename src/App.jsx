import { Routes, Route } from "react-router-dom";
import "./index.css";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import LandingPage from "./pages/LandingPage";
import Admin_UserManagement from "./pages/admin/Admin_UserManagement";
import Student_HomePage from "./pages/student/Student_HomePage";
import Student_ClassDetail from "./pages/student/Student_ClassDetail";
import Admin_UserDetail from "./pages/admin/Admin_UserDetail";
import Admin_ClassManagement from "./pages/admin/Admin_ClassManagement";
import Admin_ClassDetail from "./pages/admin/Admin_ClassDetail";
import Student_UserProfile from "./pages/student/Student_UserProfile";
import Student_Notification from "./pages/student/Student_Notification";
import Teacher_HomePage from "./pages/teacher/Teacher_HomePage";
import Teacher_ClassDetail from "./pages/teacher/Teacher_ClassDetail";
import GuestGuard from "./guards/GuestGuard";
import { AuthGuard } from "./guards/AuthGuard";
import RoleBasedGuard from "./guards/RoleBasedGuard";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestGuard>
            <LandingPage />
          </GuestGuard>
        }
      />
      <Route
        path="/login"
        element={
          <GuestGuard>
            <LoginScreen />
          </GuestGuard>
        }
      />
      <Route
        path="/register"
        element={
          <GuestGuard>
            <RegisterScreen />
          </GuestGuard>
        }
      />
      <Route path="*" element={<div>Page not found</div>} />

      <Route
        path="/user-profile"
        element={
          // <AuthGuard>
          <Student_UserProfile />
          // </AuthGuard>
        }
      />

      {/* Student */}
      <Route
        path="/student"
        element={
          <RoleBasedGuard accessibleRoles={["student"]}>
            <Student_HomePage />
          </RoleBasedGuard>
        }
      />
      <Route
        path="student/class-detail/:id"
        element={
          // <RoleBasedGuard accessibleRoles={["student"]}>
          <Student_ClassDetail />
          // </RoleBasedGuard>
        }
      />
      {/* <Route
        path="/student/notification"
        element={
          <RoleBasedGuard accessibleRoles={["student"]}>
            <Student_Notification />
          </RoleBasedGuard>
        }
      /> */}
      <Route
        path="/student/notification/:ID"
        element={
          <RoleBasedGuard accessibleRoles={["student"]}>
            <Student_Notification />
          </RoleBasedGuard>
        }
      />

      {/* Teacher */}
      <Route
        path="/teacher"
        element={
          // <RoleBasedGuard accessibleRoles={["teacher"]}>
          <Teacher_HomePage />
          // </RoleBasedGuard>
        }
      />
      <Route
        path="/teacher/class-detail/:class_id"
        element={
          // <RoleBasedGuard accessibleRoles={["teacher"]}>
          <Teacher_ClassDetail />
          // </RoleBasedGuard>
        }
      />

      {/* Admin */}
      <Route
        path="admin/user-management"
        element={
          // <RoleBasedGuard accessibleRoles={["admin"]}>
          <Admin_UserManagement />
          // </RoleBasedGuard>
        }
      />
      <Route
        path="admin/user-detail/:id"
        element={
          // <RoleBasedGuard accessibleRoles={["admin"]}>
          <Admin_UserDetail />
          // </RoleBasedGuard>
        }
      />
      <Route
        path="admin/class-management/"
        element={
          // <RoleBasedGuard accessibleRoles={["admin"]}>
          <Admin_ClassManagement />
          // </RoleBasedGuard>
        }
      />
      <Route
        path="admin/class-detail/:class_id"
        element={
          // <RoleBasedGuard accessibleRoles={["admin"]}>
          <Admin_ClassDetail />
          // </RoleBasedGuard>
        }
      />
    </Routes>
  );
}

export default App;
