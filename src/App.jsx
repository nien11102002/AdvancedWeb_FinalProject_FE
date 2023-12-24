import { Routes, Route } from "react-router-dom";
import "./index.css";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import LandingPage from "./pages/LandingPage";
import Admin_NavBar from "./components/Admin_NavBar";
import Student_NavBar from "./components/Student_NavBar";
import Admin_UsersManagement from "./pages/admin/Admin_UsersManagement";
import Student_HomePage from "./pages/student/Student_HomePage";
import ClassCard from "./components/ClassCard";
import Student_ClassDetail from "./pages/student/Student_ClassDetail";
import Admin_UserDetails from "./pages/admin/Admin_UserDetails";
import Admin_ClassManagement from "./pages/admin/Admin_ClassManagement";
import Admin_ClassDetail from "./pages/admin/Admin_ClassDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="admin/user-management" element={<Admin_UsersManagement />} />
      <Route path="/student" element={<Student_HomePage />} />
      <Route path="*" element={<div>Page not found</div>} />
      <Route path="/class-detail/:id" element={<Student_ClassDetail />} />
      <Route path="admin/user-detail/:id" element={<Admin_UserDetails />} />
      <Route
        path="admin/class-management/"
        element={<Admin_ClassManagement />}
      />
      <Route path="admin/class-detail/:id" element={<Admin_ClassDetail />} />
    </Routes>
  );
}

export default App;
