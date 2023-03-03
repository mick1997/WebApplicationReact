import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom"
import { Bootcamps } from './pages/Bootcamps';
import { Home } from "./pages/HomePage";
import BootcampDetails from "./pages/BootcampDetail";
import { SignUpAndSigninPage } from "./pages/RegistrationPage";
import { FetchData } from "./pages/FetchData";
import ProfilePage  from "./pages/ProfilePage"
import AuthServices from "./Services/AuthServices";
import Dashboard from "./pages/Dashboard";



const router = createBrowserRouter([

  {
    path: "/bootcamps/:bootcampId",
    element: (
        <>
         console.log("bootcampId",bootcampId);
          <BootcampDetails ></BootcampDetails>
          <Link to="/bootcamps/:bootcampId"></Link>
        </>
    )
  },
  {
    path: "/",
    element: (
        <>
          <Home></Home>
          <Link to="/"></Link>
        </>
    )
  },
  {
    path: "/bootcamps",
    element: (
        <>
          <Bootcamps></Bootcamps>
          <Link to="/bootcamps"></Link>
        </>
    )
  }
  ,
  {
    path: "/contactus",
    element: (
        <>
          <Bootcamps></Bootcamps>
          <Link to="/bootcamps"></Link>
        </>
    )
  }
  ,
  {
    path: "/aboutus",
    element: (
        <>
          <Bootcamps></Bootcamps>
          <Link to="/bootcamps"></Link>
        </>
    )
  }
  ,
  {
    path: "/login",
    element: (
        <>
          <SignUpAndSigninPage></SignUpAndSigninPage>
          <Link to="/login"></Link>
        </>
    )
  }
  ,

  

  {
    path: "/dashboard",
    element: (
        <>
          <Dashboard profile={AuthServices.getCurrentUser()}></Dashboard>
          <Link to="/dashboard"></Link>
        </>
    )
  },
  {
    path: "/profile",
    element: (
        <>
          <ProfilePage profile={AuthServices.getCurrentUser()}></ProfilePage>
          <Link to="/profile"></Link>
        </>
    )
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
    {/* <FetchData></FetchData> */}
  </React.StrictMode>
);
