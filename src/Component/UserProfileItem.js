import { MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AuthServices from "../Services/AuthServices";
import { baseurl } from "../include/Urlinclude";
import axios from "axios";

function UserProfileItemsTable(props) {
  const [userProfile, setUserProfile] = useState(props.userProfile);
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState(null);
  const [skills, setSkills] = useState(null);
  const [projects, setProjects] = useState(null);
  const [edit, setEdit] = useState(false);

  // console.log("checking userProfile: ", props.userProfile);

  const updateUserProfile = (event) => {
    event.preventDefault();
    setEdit(false);

    var data = JSON.stringify(userProfile);

    let token = "";
    let localUser = AuthServices.getCurrentUser(); //localStorage.getItem("user")
    // console.log("localUser: ", localUser);
    try {
      // get token
      token = JSON.parse(localUser).response;
    } 
    catch (error) {
      console.error("Axios Error", error);
      return error;
    }

    const options = {
      method: "PUT",
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
        setUserProfile(response.data);
      })
      .catch(function (error) {
        console.error("Testing error", error);
      });
  };

  // const handleInput = (name, value) => {
  //   setUserProfile({
  //     ...userProfile,
  //     education: [{ [name]: value }],
  //     experience: [{ [name]: value }],
  //     skills: [{ [name]: value }],
  //     projects: [{ [name]: value }]
  //   });
  // };

  /*const handle*/

  const handleInputEducation = (e) => {
    setUserProfile({
      ...userProfile,
      education: [{ [name]: value }]
    });
  };

  // console.log("User Profile Component", userProfile);

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Education</Accordion.Header>
          <Accordion.Body>
            <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                <tr>
                  {userProfile.education.length > 0 ? (
                    Object.keys(userProfile.education[0]).map((key, index) => {
                      return <th>{key}</th>;
                    })
                  ) : (
                    <>No Data Avaliable</>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {userProfile.education.length > 0 ? (
                    Object.values(userProfile.education[0]).map(
                      (values, index) => {
                        return (
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              value={values}
                              aria-label="name"
                              aria-describedby="basic-addon1"
                              // onChange={(event) =>
                              //   handleInputEducation(values, event.target.value)
                              // }
                              onChange={handleInputEducation}
                            ></input>
                          </td>
                        );
                      }
                    )
                  ) : (
                    <>No Data Avaliable</>
                  )}
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-success btn-round"
              onClick={(event) => updateUserProfile(event)}
            >
              Update
            </button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Experience</Accordion.Header>
          <Accordion.Body>
            <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                <tr>
                  {userProfile.experience.length > 0 ? (
                    Object.keys(userProfile.experience[0]).map((key, index) => {
                      return <th>{key}</th>;
                    })
                  ) : (
                    <>No Data Avaliable</>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {userProfile.experience.length > 0 ? (
                    Object.values(userProfile.experience[0]).map(
                      (values, index) => {
                        return (
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              value={values}
                              onChange={(event) =>
                                handleInput(values, event.target.value)}
                            ></input>
                          </td>
                        );
                      }
                    )
                  ) : (
                    <>No Data Avaliable</>
                  )}
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Skills</Accordion.Header>
          <Accordion.Body>
            <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                <tr>
                  {userProfile.skills.length > 0 ? (
                    Object.keys(userProfile.skills[0]).map((key, index) => {
                      return <th>{key}</th>;
                    })
                  ) : (
                    <>No Data Avaliable</>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {userProfile.skills.length > 0 ? (
                    Object.values(userProfile.skills[0]).map(
                      (values, index) => {
                        return (
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              value={values}
                              onChange={(event) =>
                                handleInput(values, event.target.value)}
                            ></input>
                          </td>
                        );
                      }
                    )
                  ) : (
                    <>No Data Avaliable</>
                  )}
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Projects</Accordion.Header>
          <Accordion.Body>
            <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                <tr>
                  {userProfile.projects.length > 0 ? (
                    Object.keys(userProfile.projects[0]).map((key, index) => {
                      return <th>{key}</th>;
                    })
                  ) : (
                    <>No Data Avaliable</>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {userProfile.projects.length > 0 ? (
                    Object.values(userProfile.projects[0]).map(
                      (values, index) => {
                        return (
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              value={values}
                              onChange={(event) =>
                                handleInput(values, event.target.value)}
                            ></input>
                          </td>
                        );
                      }
                    )
                  ) : (
                    <>No Data Avaliable</>
                  )}
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default UserProfileItemsTable;
