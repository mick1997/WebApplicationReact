import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BootcampData } from "../Component/BootcampData";
import HeaderBar from "../Component/DashNav/HeaderBar";
import SideNavBar from "../Component/DashNav/Sidebar";
import { Footer } from "../Component/Footer";
import { HeadSection } from "../Component/HeadSection";
import { NavBar } from "../Component/Nav";
import BootcampList from '../Data/bootcamp.json'
import { baseurl } from "../include/Urlinclude";
import AuthServices from "../Services/AuthServices";

const BootcampDetails = (props) => {
    // hook for taking the param s to the component

    let [param1, param2, param3] = window.location.pathname.split("/") ///  
    console.log("p1", param2, param3)
    const menuItems = [
        { text: "Home", href: "/" },
        { text: "Contact", href: "/contact" },
        { text: "About Us", href: "/about" },
        { text: "Bootcamps", href: "/bootcamps" },
    ]

    let [bootcampList, setBootcampList] = useState()
    let params = useParams();

    useEffect(() => {
        async function getMenus() {
            var raw = JSON.stringify({
                "bootcampId": param3
            });

            var requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JSON.parse(AuthServices.getCurrentUser()).response}`,
                    "Content-Type": "application/json"
                },
                body: raw,
                redirect: 'follow'
            };

            try {
                let url = baseurl + "/bootcamp/getbootcampbyid"
                /*                const response = await fetch(url,requestOptions) */
                //                 let json = response.json()
                await fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setBootcampList(data)
                        console.log("All Data ", data)
                    })
            }
            catch (error) {
                let array = BootcampList.BootcampList
                setBootcampList(array)
            }
        }
        getMenus() // IIF
        console.log("Dheeraj 123", bootcampList)
    }, [])

    // let bootcampItem = BootcampList.BootcampList.filter((x) => x.id == params.bootcampId)
    // console.log(bootcampItem[0].image)

    return (
        <>
            {/* <NavBar items={menuItems}></NavBar> */}
            <div>
                <HeaderBar></HeaderBar>
                <SideNavBar></SideNavBar>
            </div>

            <div>
      <section className="bg-dark mt-5 text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1 className="whiteColor">
                Become a <span className="text-warning"> Web Developer </span>
              </h1>
              <p className="lead my-4 whiteColor">
                We focus on teaching our students the fundamentals of the latest
                and greatest technologies to prepare them for their first dev role
              </p>
              <button
                className="btn btn-primary btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#enroll"
              >
                Start The Enrollment
              </button>
            </div>
            {/* <img
              className="img-fluid w-50 d-none d-sm-block"
              src={showcase}
              alt="Logo"
            ></img> */}
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="enroll"
        tabindex="-1"
        aria-labelledby="enrollLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="enrollLabel">
                Enrollment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="lead">
                Fill out this form and we will get back to you
              </p>
              <form>
                <div className="mb-3">
                  <label for="first-name" className="col-form-label">
                    First Name:
                  </label>
                  <input type="text" className="form-control" id="first-name" />
                </div>
                <div className="mb-3">
                  <label for="last-name" className="col-form-label">
                    Last Name:
                  </label>
                  <input type="text" className="form-control" id="last-name" />
                </div>
                <div className="mb-3">
                  <label for="email" className="col-form-label">
                    Email:
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label for="phone" className="col-form-label">
                    Phone:
                  </label>
                  <input type="tel" className="form-control" id="phone" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  

            {/* {
                bootcampItem.map(data => {
                    return (
                        <>
                        <BootcampData data={data}></BootcampData> 
                        </>
                    )
                })
            } */}
            {/* <Footer></Footer>    */}
        </>
    )
}


export default BootcampDetails