import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import "./index.css";
import LandingPage from "./routes/LandingPage";
import LoginScreen from "./routes/LoginScreen";
import RegisterScreen from "./routes/RegisterScreen";
import HomePage from "./routes/HomePage";
import UserProfile from "./routes/UserProfile";

function App(){
    // const router = createBrowserRouter([
    //     {
    //       path:"/",
    //       element: <LandingPage/>,
    //     },
    //     {
    //       path: "/home",
    //       element: <HomePage/>,
    //     },
    //     {
    //       path: "/login",
    //       element: <LoginScreen/>,
    //     },
    //     {
    //       path: "/register",
    //       element: <RegisterScreen/>,
    //     },
    //     {
    //       path: "/user-profile",
    //       element: <UserProfile/>,
    //     },
    //   ]);
    return (
        // <RouterProvider router={router}></RouterProvider>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/register" element={<RegisterScreen/>}/>
          <Route path="/user-profile" element={<UserProfile/>}/>
        </Routes>
    );
}

export default App;