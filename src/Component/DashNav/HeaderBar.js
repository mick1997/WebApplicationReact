import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Logout } from "../Logout";
import "./myStyles.css";

class HeaderBar extends React.Component {
  render() {
    return (
      <div className="topnav">
        <Navbar
          fixed="top"
          expand="lg"
          bg="dark"
          variant="dark"
          className="topnav"
        >
          <Navbar.Brand href="">V-Canteen</Navbar.Brand>

          <Logout className="light" isLoggedIn={true}></Logout>

        </Navbar>


      </div>
    );
  }
}

export default HeaderBar;
