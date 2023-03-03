import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { baseurl } from "../include/Urlinclude";
import AuthServices from "../Services/AuthServices";

export const Registor = (props) => {
  const [authMode, setAuthMode] = useState("signin");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [loginResponse, setLoginResponse] = useState({
    state: false,
    msg: "",
  });

  useEffect( ()=> {
    if(loginResponse.status === "success") {
        alert("loginResponse", loginResponse.status)
        props.handleClose()
        //return redirect("/login");
    }
  }
   ,[loginResponse])

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  function registeration(event) {
    event.preventDefault();
    var data = JSON.stringify({
      email: email,
      firstName: firstname,
      lastName: lastname,
      password: password,
      mobileNumber: mobilenumber,
    });

    var config = {
      method: "post",
      url: baseurl + "/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  async function Login(event) {
    event.preventDefault();
    try {
      await AuthServices.login(email, password);
      const storageUser = JSON.parse(AuthServices.getCurrentUser());
      console.log("THE USER", storageUser);
      if (storageUser) {
        setLoginResponse(storageUser);
        return redirect("/dasdasd");
      }

      console.log("THE State", loginResponse);
    } 
    catch (errorMsg) {
      setLoginResponse({
        state: "Fatal! Need to contact Admin",
        response: errorMsg,
      });
    }
  }

  if (authMode === "signin") {
    return (
      <div>
        {loginResponse?.status === "error" ? (
          <>
            <Alert id="error" variant="danger" dismissible>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{loginResponse.response}</p>
            </Alert>
          </>
        ) 
        : 
        loginResponse?.status === "success" ?
          <>
            <Alert id="success" variant="success" dismissible>
              <Alert.Heading>Great! Good Job</Alert.Heading>
                {loginResponse.status && (
                  <Navigate to="/dashboard" replace={true} />
                )}
            </Alert>
          </> : <></>
        }
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label type="text">Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={Login}
                >
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label type="text">First Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jack"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label type="text">Last Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Lee"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label type="text">Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label type="text">Password</label>
            <input
              type="password"
              className="form-control mt-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label type="text">Mobile Number</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g 111 111 1111"
              onChange={(e) => setMobilenumber(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={registeration}
            >
              Register
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};
