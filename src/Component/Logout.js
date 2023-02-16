import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";

export const Logout = (props) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn)
    const handleClick = () => {
        setIsLoggedIn(!isLoggedIn)
        localStorage.removeItem("user")

       navigate("/");
   //return redirect("/")  // is used to perform actions -->> Get POST
    }


    useEffect( ()=>{
       //return redirect("/")
      }
       ,[isLoggedIn])
    

    let currentStatus = isLoggedIn ? "logged in" : "logged out";
    let buttonStatus = isLoggedIn ? "Log Out" : "Log In";

    

    return (
        <div className="buttonHelper">
            <Button variant="secondary" style={{float: "right"}} onClick={handleClick}>
                {buttonStatus}
            </Button>
        </div>
    );
}