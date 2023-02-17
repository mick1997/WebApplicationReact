import { useEffect, useState } from "react";
import { NavBar } from "../Component/Nav";
import { Footer } from "../Component/Footer";
import { Button, Modal } from "react-bootstrap";
import { Registor } from "../Component/Registration";
import axios from "axios";
import AuthServices from "../Services/AuthServices";
import React from "react";
import "../index.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
} from "mdb-react-ui-kit";
import Accordion from "react-bootstrap/Accordion";
import { baseurl } from "../include/Urlinclude";
import UserProfileItemsTable from "./UserProfileItem";

// import AxiosClient from "../Services/AxiosClient";

function Profile() {
  const [edit, setEdit] = useState(false);
  // instead of reading it from props, we are making api call from there we will render the state
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let token = "";
    let localUser = AuthServices.getCurrentUser(); //localStorage.getItem("user")
    // console.log("localUser: ", localUser);
    try {
      // get token
      token = JSON.parse(localUser).response;
    } catch (error) {
      console.error("Axios Error", error);
      return error;
    }

    const options = {
      method: "POST",
      url: baseurl + "/apiauth/apiprofile",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {},
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("testing the response", response.data);
        setProfile(response.data);
      })
      .catch(function (error) {
        console.error("Testing error", error);
      });
  }, []);

  const updateProfile = (event) => {
    event.preventDefault();
    setEdit(false);

    var data = JSON.stringify(profile);

    let token = "";
    let localUser = AuthServices.getCurrentUser(); //localStorage.getItem("user")
    // console.log("localUser: ", localUser);
    try {
      // get token
      token = JSON.parse(localUser).response;
    } catch (error) {
      console.error("Axios Error", error);
      return error;
    }

    const options = {
      method: "POST",
      url: baseurl + "/apiauth/updateprofile",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("testing the response", response.data);
        setProfile(response.data);
      })
      .catch(function (error) {
        console.error("Testing error", error);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const handleInput = (name, value) => {
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  return (
    <>
      <section className="profileBody" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <a href="dashboard">Home</a>
                </MDBBreadcrumbItem>
                {edit === true ? (
                  <>
                    {" "}
                    <MDBBreadcrumbItem active>
                      Edit the user profile
                    </MDBBreadcrumbItem>
                  </>
                ) : (
                  <>
                    {" "}
                    <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                  </>
                )}
              </MDBBreadcrumb>
            </MDBCol>
            <MDBCol>
              <Button value="Edit" onClick={handleEdit}>
                Edit
              </Button>
            </MDBCol>
          </MDBRow>

          {edit === true ? (
            <>
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <div className="justify-content-center mb-2">
                        <div>
                          <MDBCardImage
                            src={profile.profilePicture}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid
                          />
                        </div>
                        <label class="form-label" for="customFile">
                          Choose your profile picture to upload
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          // onChange={(e) => setProfilePic(e.target.value)}
                          id="customFile"
                          value={profile.profilePicture}
                          aria-label="profilePicture"
                          aria-describedby="basic-addon1"
                          onChange={(event) =>
                            handleInput("profilePicture", event.target.value)
                          }
                        />
                      </div>
                      <div className="d-flex justify-content-center mb-2">
                        <MDBBtn>Follow</MDBBtn>
                        <MDBBtn outline className="ms-1">
                          Message
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>

                  <MDBCard className="mb-4 mb-lg-0">
                    <MDBCardBody className="p-0">
                      <MDBListGroup flush className="rounded-3">
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="linkedin fa-lg "
                            style={{ color: "#00008B" }}
                          />
                          <MDBCardText>
                            <input
                              type="text"
                              className="text-muted"
                              id="linkedin"
                            ></input>
                          </MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="github fa-lg"
                            style={{ color: "#333333" }}
                          />
                          <MDBCardText>
                            <input
                              type="text"
                              className="text-muted"
                              id="github"
                            ></input>
                          </MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="twitter fa-lg"
                            style={{ color: "#55acee" }}
                          />
                          <MDBCardText>
                            <input
                              type="text"
                              className="text-muted"
                              id="twitter"
                            ></input>
                          </MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="instagram fa-lg"
                            style={{ color: "#ac2bac" }}
                          />
                          <MDBCardText>
                            <input
                              type="text"
                              className="text-muted"
                              id="instagram"
                            ></input>
                          </MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="facebook fa-lg"
                            style={{ color: "#3b5998" }}
                          />
                          <MDBCardText>
                            <input
                              type="text"
                              className="text-muted"
                              id="facebook"
                            ></input>
                          </MDBCardText>
                        </MDBListGroupItem>
                      </MDBListGroup>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>First Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            type="text"
                            class="form-control"
                            value={profile.firstName}
                            aria-label="first"
                            aria-describedby="basic-addon1"
                            onChange={(event) =>
                              handleInput("firstName", event.target.value)
                            }
                          ></input>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Last Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            type="text"
                            class="form-control"
                            value={profile.lastName}
                            aria-label="last"
                            aria-describedby="basic-addon1"
                            onChange={(event) =>
                              handleInput("lastName", event.target.value)
                            }
                          ></input>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            <input
                              type="text"
                              class="form-control"
                              value={profile.email}
                              aria-label="email"
                              aria-describedby="basic-addon1"
                              onChange={(event) =>
                                handleInput("email", event.target.value)
                              }
                            ></input>
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Password</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            <input
                              type="text"
                              class="form-control"
                              value={profile.password}
                              aria-label="password"
                              aria-describedby="basic-addon1"
                              onChange={(event) =>
                                handleInput("password", event.target.value)
                              }
                            ></input>
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Mobile</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            <input
                              type="text"
                              class="form-control"
                              value={profile.mobileNumber}
                              aria-label="mobilenumber"
                              aria-describedby="basic-addon1"
                              onChange={(event) =>
                                handleInput("mobilenumber", event.target.value)
                              }
                            ></input>
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Address</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            <input
                              type="text"
                              class="form-control"
                              value={profile.address}
                              aria-label="address"
                              aria-describedby="basic-addon1"
                              onChange={(event) =>
                                handleInput("ad", event.target.value)
                              }
                            ></input>
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>

                  <MDBRow>
                    <MDBCol md="12">
                      <MDBCard className="mb-4 mb-md-0">
                        <UserProfileItemsTable
                          userProfile={profile.userProfile[0]}
                        ></UserProfileItemsTable>
                        <div className="container mt-3">
                          <button
                            type="button"
                            className="btn btn-success btn-round"
                            onClick={(event) => updateProfile(event)}
                          >
                            Update
                          </button>
                        </div>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </>
          ) : (
            <>
              {profile != null ? (
                <>
                  <MDBRow>
                    <MDBCol lg="4">
                      <MDBCard className="mb-4">
                        <MDBCardBody className="text-center">
                          <MDBCardImage
                            src={profile.profilePicture}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid
                          />
                          <p className="text-muted mb-1">
                            Full Stack Developer |
                            {profile?.roles.length > 0 ? (
                              <> {profile.roles[0].role}</>
                            ) : (
                              <>No Roles</>
                            )}
                          </p>
                          <p className="text-muted mb-4">{profile.address}</p>
                          <div className="d-flex justify-content-center mb-2">
                            <MDBBtn>Follow</MDBBtn>
                            <MDBBtn outline className="ms-1">
                              Message
                            </MDBBtn>
                          </div>
                        </MDBCardBody>
                      </MDBCard>

                      <MDBCard className="mb-4 mb-lg-0">
                        <MDBCardBody className="p-0">
                          <MDBListGroup flush className="rounded-3">
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                              <MDBIcon
                                fab
                                icon="linkedin fa-lg"
                                style={{ color: "#00008B" }}
                              />
                              <MDBCardText>
                                {profile?.userProfile.length > 0 ? (
                                  <>{profile.userProfile[0].linkedin}</>
                                ) : (
                                  <>No LinkedIn website</>
                                )}
                              </MDBCardText>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                              <MDBIcon
                                fab
                                icon="github fa-lg"
                                style={{ color: "#333333" }}
                              />
                              <MDBCardText>
                                {profile?.userProfile.length > 0 ? (
                                  <>{profile.userProfile[0].github}</>
                                ) : (
                                  <>No GitHub website</>
                                )}
                              </MDBCardText>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                              <MDBIcon
                                fab
                                icon="twitter fa-lg"
                                style={{ color: "#55acee" }}
                              />
                              <MDBCardText>no input data</MDBCardText>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                              <MDBIcon
                                fab
                                icon="instagram fa-lg"
                                style={{ color: "#ac2bac" }}
                              />
                              <MDBCardText>no input data</MDBCardText>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                              <MDBIcon
                                fab
                                icon="facebook fa-lg"
                                style={{ color: "#3b5998" }}
                              />
                              <MDBCardText>no input data</MDBCardText>
                            </MDBListGroupItem>
                          </MDBListGroup>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                      <MDBCard className="mb-4">
                        <MDBCardBody>
                          <MDBCardText className="mb-4">
                            <span className="text-primary font-italic me-1">
                              General Information
                            </span>{" "}
                          </MDBCardText>
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>First Name</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {profile.firstName}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Last Name</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {profile.lastName}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Email</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {profile.email}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Mobile</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {profile.mobileNumber}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Address</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {profile.address}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>

                      <MDBRow>
                        <MDBCol md="12">
                          <MDBCard className="mb-4 mb-md-0">
                            <MDBCardBody>
                              <MDBCardText className="mb-4">
                                <span className="text-primary font-italic me-1">
                                  User Profile
                                </span>{" "}
                              </MDBCardText>
                              <table className="table align-middle mb-0 bg-white">
                                <thead className="bg-light">
                                  <tr>
                                    <th>Name</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Position</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <img
                                          src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                          alt=""
                                          style={{
                                            width: "45px",
                                            height: "45px",
                                          }}
                                          className="rounded-circle"
                                        />
                                        <div className="ms-3">
                                          <p className="fw-bold mb-1">
                                            {profile.fullName}
                                          </p>
                                          <p className="text-muted mb-0">
                                            {profile.email}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <p className="fw-normal mb-1">
                                        Software engineer
                                      </p>
                                      <p className="text-muted mb-0">
                                        IT department
                                      </p>
                                    </td>
                                    <td>
                                      <span className="badge badge-success rounded-pill d-inline">
                                        Active
                                      </span>
                                    </td>
                                    <td>Senior</td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-link btn-sm btn-rounded fw-bold"
                                      >
                                        Edit
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <br />
                              <MDBCardText className="mb-4">
                                <span className="text-primary font-italic me-1">
                                  User Detail Profile
                                </span>{" "}
                              </MDBCardText>
                              <Accordion flush>
                                <Accordion.Item eventKey="0">
                                  <Accordion.Header>Education</Accordion.Header>
                                  <Accordion.Body>
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">Name</th>
                                          <th scope="col">University</th>
                                          <th scope="col">City</th>
                                          <th scope="col">State</th>
                                          <th scope="col">Country</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .education[0].name
                                                }
                                              </>
                                            ) : (
                                              <>No Name Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .education[0].university
                                                }
                                              </>
                                            ) : (
                                              <>No University Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .education[0].city
                                                }
                                              </>
                                            ) : (
                                              <>No City Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .education[0].state
                                                }
                                              </>
                                            ) : (
                                              <>No State Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .education[0].country
                                                }
                                              </>
                                            ) : (
                                              <>No Country Show</>
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                  <Accordion.Header>
                                    Experience
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    <table class="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">Name</th>
                                          <th scope="col">Years</th>
                                          <th scope="col">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .experience[0].name
                                                }
                                              </>
                                            ) : (
                                              <>No Name Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .experience[0].years
                                                }
                                              </>
                                            ) : (
                                              <>No Years Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .experience[0].description
                                                }
                                              </>
                                            ) : (
                                              <>No Description Show</>
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                  <Accordion.Header>Skills</Accordion.Header>
                                  <Accordion.Body>
                                    <table class="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">Skill Name</th>
                                          <th scope="col">Proficiency</th>
                                          <th scope="col">
                                            Certification Link
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .skills[0].skillName
                                                }
                                              </>
                                            ) : (
                                              <>No Skill Name Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .skills[0].proficieny
                                                }
                                              </>
                                            ) : (
                                              <>No Proficiency Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .skills[0].certificationLink
                                                }
                                              </>
                                            ) : (
                                              <>No Certification Link Show</>
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                  <Accordion.Header>Projects</Accordion.Header>
                                  <Accordion.Body>
                                    <table class="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">Name</th>
                                          <th scope="col">TechStack</th>
                                          <th scope="col">Roles</th>
                                          <th scope="col">Responsibilities</th>
                                          <th scope="col">Team Size</th>
                                          <th scope="col">Details</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .projects[0].name
                                                }
                                              </>
                                            ) : (
                                              <>No Name Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .projects[0].techStack
                                                }
                                              </>
                                            ) : (
                                              <>No Tech Stack Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .projects[0].roles
                                                }
                                              </>
                                            ) : (
                                              <>No Rols Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .projects[0]
                                                    .responsibilities
                                                }
                                              </>
                                            ) : (
                                              <>No Responsibilities Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .projects[0].teamSize
                                                }
                                              </>
                                            ) : (
                                              <>No Team Size Show</>
                                            )}
                                          </td>
                                          <td>
                                            {profile?.userProfile.length > 0 ? (
                                              <>
                                                {
                                                  profile.userProfile[0]
                                                    .projects[0].details
                                                }
                                              </>
                                            ) : (
                                              <>No Details Show</>
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>
                  </MDBRow>
                </>
              ) : (
                <>No Profile Show</>
              )}
            </>
          )}
        </MDBContainer>
      </section>
    </>
  );
}

export { Profile };
