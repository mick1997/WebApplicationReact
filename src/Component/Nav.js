import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthServices from "../Services/AuthServices.js";
import { Button } from "react-bootstrap";
import "../style/bootcampstyles.css";
import guestUser from "../img/user-login-icon.svg";
import { Logout } from "./Logout.js";

export const NavBar = (props) => {


  // const [currentUser, setCurrentUser] = useState(props.user);
  
  // useEffect(() => {
  //   const user = AuthServices.getCurrentUser();
  //   console.log("The User From Local Storage", user);
  //   if (user == null) {
  //     setCurrentUser(null);
  //   } else {
  //     setCurrentUser(user);
  //     // go to the profile  API of the user from the backend
  //     // that we shall access and put the information in the currentUser state
  //   }
  // }, []);

  console.log("users in nva", props.user);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
        <div className="container">
          <a href="#" className="navbar-brand">
            <img src="https://www.snva.com/assets/img/img-logo/snvalogo.svg"></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              {props.items.map((item, index) => {
                return (
                  <li className="nav-item">
                    {/* <a href={item.href} classNameName="nav-link">{item.text}</a> */}
                    <Link className="nav-link" to={item.href}>
                      {item.text}
                    </Link>
                  </li>
                );
              })};
            </ul>
          </div>

          <div className="bg-dark">
            { props.user?.status === "success" ? (
              <>
                <Link to="/profile">
                  <div className="login-base ml-4">
                    <div className="Login-wrapp bg-primary text-light">
                      <img src={guestUser} className="ico-us"></img>
                      View Profile
                    </div>
                   
                  </div>
                </Link>
                <Logout isLoggedIn={false}></Logout>
              </>
            ) : (
              <>
                {/* <img src={guestUser}></img>
                                <a href="" classNameName="nav-link">Login</a> */}
                <div className="login-base ml-4">
                  <div className="Login-wrapp bg-primary text-light">
                    <a className="text-sm Login-button">
                      <span className="ico-us">
                        <svg
                          className="svg-inline--fa fa-user"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="user"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          data-fa-i2svg=""
                        >
                          <path
                            fill="currentColor"
                            d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
                          ></path>
                        </svg>
                      </span>
                      <span
                        style={{ "color": "white" }}
                        className="d-none d-md-inline-block  align-middle"
                      >
                        <Button onClick={props.handleShow}>
                          Log In/Sign Up
                        </Button>
                    
                      </span>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
