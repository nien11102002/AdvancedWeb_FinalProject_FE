import { Routes, Route } from "react-router-dom";
import "./index.css";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import LandingPage from "./pages/LandingPage";
import Admin_NavBar from "./components/Admin_NavBar";
import Student_NavBar from "./components/Student_NavBar";
import Admin_UserManagement from "./pages/admin/Admin_UserManagement";
import Student_HomePage from "./pages/student/Student_HomePage";
import ClassCard from "./components/ClassCard";
import Student_ClassDetail from "./pages/student/Student_ClassDetail";
import Admin_UserDetail from "./pages/admin/Admin_UserDetail";
import Admin_ClassManagement from "./pages/admin/Admin_ClassManagement";
import Admin_ClassDetail from "./pages/admin/Admin_ClassDetail";
import Student_UserProfile from "./pages/student/Student_UserProfile";
import Student_Notification from "./pages/student/Student_Notification";
import Teacher_HomePage from "./pages/teacher/Teacher_HomePage";
import Teacher_ClassDetail from "./pages/teacher/Teacher_ClassDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="*" element={<div>Page not found</div>} />
      <Route path="/user-profile" element={<Student_UserProfile />} />

      {/* Student */}
      <Route path="/student" element={<Student_HomePage />} />
      <Route
        path="student/class-detail/:id"
        element={<Student_ClassDetail />}
      />
      <Route path="/student/notification" element={<Student_Notification />} />
      <Route
        path="/student/notification/:id"
        element={<Student_Notification />}
      />

      {/* Teacher */}
      <Route path="/teacher" element={<Teacher_HomePage />} />
      <Route
        path="/teacher/class-detail/:id"
        element={<Teacher_ClassDetail />}
      />

      {/* Admin */}
      <Route path="admin/user-management" element={<Admin_UserManagement />} />
      <Route path="admin/user-detail/:id" element={<Admin_UserDetail />} />
      <Route
        path="admin/class-management/"
        element={<Admin_ClassManagement />}
      />
      <Route path="admin/class-detail/:id" element={<Admin_ClassDetail />} />
    </Routes>
  );
}

export default App;
