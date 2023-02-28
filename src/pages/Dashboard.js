import { useState } from "react";
import { Modal } from "react-bootstrap";
import HeaderBar from "../Component/DashNav/HeaderBar";
import SideNavBar from "../Component/DashNav/Sidebar";
import { Footer } from "../Component/Footer";
import { NavBar } from "../Component/Nav";
import ProfilePage, { Profile } from "../Component/Profile";
import { Registor } from "../Component/Registration";
import LoadingSpinner from "../Component/Spinner";

const Dashboard = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // console.log(user);

  const menuItems = [
    { text: "Home", href: "/" },
    { text: "Contact", href: "/contact" },
    { text: "About Us", href: "/about" },
    { text: "Bootcamps", href: "/bootcamps" },
  ];

  if (!menuItems) 
    return (
      <div>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
    
  return (
    <>
      <div>
        <HeaderBar>
          <span></span>
        </HeaderBar>
        <SideNavBar></SideNavBar>
      </div>
      <div></div>
      <div>
        <Footer></Footer>
      </div>
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Registor handleClose={handleClose}></Registor>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default Dashboard;
