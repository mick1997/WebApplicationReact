import { MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AuthServices from "../Services/AuthServices";
import { baseurl } from "../include/Urlinclude";
import axios from "axios";

function UserProfileItemsTable(props) {
  const [userProfile, setUserProfile] = useState(props.userProfile);
  const [edit, setEdit] = useState(false);
  // instead of reading it from props, we are making api call from there we will render the state
  const [profile, setProfile] = useState(null);

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

  const handleInputEducation = (name, value) => {
    setUserProfile({
      ...userProfile,
      education: [
        {[name]: value}
      ]
    });
  };

  console.log("User Profile Component", userProfile);

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
                    <td>
                    <input
                            type="text"
                            class="form-control"
                            value={userProfile.education[0].name}
                            aria-label="last"
                            aria-describedby="basic-addon1"
                            onChange={(event) =>
                              handleInputEducation("name", event.target.value)
                            }
                          ></input>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Experience</Accordion.Header>
          <Accordion.Body>
            
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      
    </>
  );
}

export default UserProfileItemsTable;
