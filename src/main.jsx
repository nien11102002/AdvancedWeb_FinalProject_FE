import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LandingPage from "./routes/LandingPage";
import LoginScreen from "./routes/LoginScreen";
import RegisterScreen from "./routes/RegisterScreen";
import HomePage from "./routes/HomePage";
import UserProfile from "./routes/UserProfile";

const router = createBrowserRouter([
  {
    path:"/",
    element: <LandingPage/>,
  },
  {
    path: "/home",
    element: <HomePage/>,
  },
  {
    path: "/login",
    element: <LoginScreen/>,
  },
  {
    path: "/register",
    element: <RegisterScreen/>,
  },
  {
    path: "/user-profile",
    element: <UserProfile/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);