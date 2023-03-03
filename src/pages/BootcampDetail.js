import { useEffect, useState } from "react";
import { Accordion, Container, Row } from "react-bootstrap";
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

import './BootcampDetails.css'

const BootcampDetails = (props) => {
  // hook for taking the param s to the component

  let urlParams = window.location.pathname.split("/") ///  
  let [bootcamp, setBootcamp] = useState({})

  const menuItems = [
    { text: "Home", href: "/" },
    { text: "Contact", href: "/contact" },
    { text: "About Us", href: "/about" },
    { text: "Bootcamps", href: "/bootcamps" },
  ]

  useEffect(() => {
    async function getMenus() {
      var raw = JSON.stringify({
        "bootcampId": urlParams[urlParams.length - 1]
      });

      console.log("The Request Object ", raw)

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
        await fetch(url, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log("All Data  Data", data)
            setBootcamp(data)
            console.log("All Data bootcamp", bootcamp)
          })
      }
      catch (error) {
        console.log("In The Error ", error)
        let array = BootcampList.BootcampList
        setBootcamp(array)
      }
    }
    getMenus() // IIF
    console.log("Dheeraj 123", bootcamp)
  }, [])

  // let bootcampItem = BootcampList.BootcampList.filter((x) => x.id == params.bootcampId)
  // console.log(bootcampItem[0].image)

  return (
    <>
      {/* <NavBar items={menuItems}></NavBar> */}
      <div >
        <HeaderBar></HeaderBar>
        <SideNavBar ></SideNavBar>
      </div>

      <div className="content-area">
        <section className="bg-dark mt-4 text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start background-blue" >
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1 className="whiteColor">
                Become a <span className="text-warning">{bootcamp.name} </span>
              </h1>
              <p className="lead my-4 whiteColor">
                {bootcamp.description}
              </p>
            </div>
            <img
              className="img-fluid w-50"
              src={bootcamp.bannerLargeImage}
              alt="Logo"
            ></img>

          </div>
        </section>

        <section>
          <div class="navbar navbar-expand-sm navbar-light bg-white border-bottom-2 navbar-list p-0 m-0 align-items-center">
            <div>
              <ul>
                <li>Some Data</li>
                <li>Some Data</li>
                <li>Some Data</li>

              </ul>
            </div>
          </div>
        </section>

        <section>
          <div class="bg-white border-bottom-2 navbar-list p-0 m-0 align-items-center">
            <Row><h1>The Technology Stack</h1></Row>
            <div className="row">
              {
                bootcamp?.technologyStack?.map((item, index) => {
                  return (
                    <>
                      <div className="card text-white bg-primary m-2 mb-3 col-6 col-md-3 col-sm-6" style={{ "max-width": "18rem;" }}>
                        <div class="card-header">{item.name}</div>
                        <div class="card-body">
                          <ul>
                            <li><span> <i class="bi bi-building"></i> {item.vendorName}</span>                              </li>
                            <li><span><i class="bi bi-list-check"></i>{item.version}</span></li>
                          </ul>


                        </div>
                      </div>
                    </>)
                })
              }
            </div>
          </div>
        </section>


        <section>
          <div class="bg-white border-bottom-2 navbar-list p-0 m-0 align-items-center">
            <Row><h1>The Sessions</h1></Row>
            <div className="row">


              <div id="accordion-outer">
                {
                  bootcamp?.sessions?.map((item, indexOuter) => {
                    return (
                      <>
                        <Accordion defaultActiveKey={indexOuter}>
                          <Accordion.Item eventKey={indexOuter}>
                            <Accordion.Header>{item.name}</Accordion.Header>
                            <Accordion.Body>

                              {
                                item.sessionItems?.map((itemInner, index) => {
                                  return (


                                    <Accordion defaultActiveKey={index}>
                                      <Accordion.Item eventKey={index}>
                                        <Accordion.Header>{itemInner.name}</Accordion.Header>
                                        <Accordion.Body>
                                          {
                                            itemInner.details
                                          }
                                          {
                                            itemInner.sessionDate
                                          }
                                          {
                                            itemInner.details
                                          }

                                        </Accordion.Body>
                                      </Accordion.Item>
                                    </Accordion>




                                  )
                                })
                              }
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </section>

      </div>



    </>
  )
}


export default BootcampDetails