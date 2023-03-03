// we must have the capability to navigate between the pages or we must know how to assign URL routing in the react js 
import BootcampList from "../Data/bootcamp.json";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavBar } from "../Component/Nav";
import { HeadSection } from "../Component/HeadSection";
import { Footer } from "../Component/Footer";
import { Link, useParams } from "react-router-dom";
import { baseurl } from "../include/Urlinclude";
import axios from "axios";

// Routing  
const Bootcamp = (props) => {
    const [bootcamp, setBootcamp] = useState(props)
    console.log("bootcamp:"+bootcamp)
    return (
        <Card style={{ width: bootcamp.width }} className="m-5">
            <Card.Img variant="top" src={bootcamp.imageSrc} />
            <Card.Body>
                <Card.Title>{bootcamp.title}</Card.Title>
                <Card.Text>
                    {bootcamp.body}
                </Card.Text>                
                <Link className="btn btn-warning position-absolute end-50" to={props.identifier} >Details</Link>
            </Card.Body>
        </Card>
    );
}


const Bootcamps = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const menuItems = [
        { text: "Home", href: "/" },
        { text: "Contact", href: "/contact" },
        { text: "About Us", href: "/aboutus" },
        { text: "Bootcamps", href: "/bootcamps" },
    ]

    const [bootcamps, setBootcamps] = useState([])

    useEffect(() => {
        async function GetBootcamps() {


            const options = {
                method: 'GET',
                url: 'http://localhost:8077/api/v1/bootcamp/allbootcamps',
                headers: {                  
                  Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaGVlcmFqLnNpbmdoQHNudmEuY29tIiwicm9sZXMiOlsiUEFSVElDSVBBTlQiXSwiZXhwIjoxNjc4NTcyNTkwfQ.M5Q6_YytItSEDM8SBZJlCl1RWdm05o7LWrE1YL9-BH1WIynDdS26W-fQENTvqrB3ZEmbRcpazypxZ7vzB7Etrg'
                },
                data: {}
              };
              
              axios.request(options).then(function (response) {
                console.log(response.data);
                setBootcamps(response.data)
                console.log("All Data ", bootcamps)

                
              }).catch(function (error) {
                console.error(error);
                setBootcamps(BootcampList.BootcampList)
              });



            // try {
            //     const response = await fetch(baseurl + "/bootcamp/allbootcamps")
            //    response.then(response=>response.json())
            //    .then(json=>{
            //         setBootcamps(json.BootcampList)
            //         console.log("All Data ", bootcamps)
            //    })
            //    .error(error=>{console.log(error)})
               
               
                
            //     // json.then(data => {
            //     //     setBootcamps(data.BootcampList)
            //     //     console.log("All Data ", bootcamps)
            //     // })
            // } 
            // catch (error) {
            //     console.log("Reading Bootcamp 1", BootcampList)
            //     setBootcamps(BootcampList.BootcampList)
            // }
        }
        GetBootcamps() // IIF
    }, [])

    if (!bootcamps) return <>Loading ....</>
    return (
        <>
            <NavBar user={user} handleClose={handleClose} handleShow={handleShow} items={menuItems}></NavBar>
            <HeadSection></HeadSection>
            <BootCampSeaerchBar></BootCampSeaerchBar>
            <Container>
                <Row>
                    {
                        bootcamps.map((item) =>
                            <Col md={4} xs={12} sm={6}>
                                <Bootcamp className="col col-md-3" identifier={"/bootcamps/"+item.id} title={item.text} width={item.width} imageSrc={item.image} body={item.description} ></Bootcamp>
                            </Col>
                        )
                    }
                </Row>
            </Container>
            <Footer></Footer>
        </>
    )
};

const BootCampSeaerchBar = () => {
    return(
        <>
        <section class="bg-primary text-light p-5">
            <Container>
                <div class="d-md-flex justify-content-between align-items-center">
                    <h3 class="mb-3 mb-md-0">Search Bootcamps</h3>
                    <div class="input-group news-input">
                        <input type="text" class="form-control" placeholder="Use keywords like the stack or the technology"></input>
                            <button class="btn btn-dark btn-lg" type="button">Submit</button>
                            </div>
                        </div>
            </Container>
        </section>
        </>
    )
}

export { Bootcamps }