import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import Footer from "../components/Footer"
import NavBar from "../components/Navbar"
import ContactUs from '../components/ContactUs';

function AboutUs() {
    const [email, setEmail] = useState([]);
    const [subject, setSubject] = useState([]);
    const [message, setMessage] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, subject, message })
        })
            .then(response => response.json())
            .then(data => document.getElementById("result").innerHTML = data.message)
            .catch(error => console.error(error));
    }

    return (
        <div>
            <NavBar />

            <Container className="w-75 p-5 my-5">
                <Row className="text-center m-5">
                    <p className="fs-1 text-dark">Created to help you live better,<br /> happier, healthier life.</p>
                    <p>We believe fitness should be accessible to everyone, everywhere, regardless of income level or access to a gym. That's why we offer hundreds of free, full-length workout videos, the most affordable and effective workout programs on the web, meal plans, and helpful health, nutrition and fitness information.</p>
                </Row>
            </Container>

            <Container className="w-75 p-5 my-5">
                <Row className="mx-5">
                    <h2>OUR MISSION</h2>
                    <p className="px-5">At FitMe our mission is to build a platform that provides people with the knowledge, tools and products to reach their fitness and physique goals.</p>
                </Row>
            </Container>

            <div className="bg-info p-5 my-5">
                <div className="w-50 my-5 mx-auto d-flex justify-content-between ">
                        <p className="fs-2 text-white fw-light m-0">Ready to try a FitMe workout?</p>
                        <Link to="/Exercises" className=""><Button variant="secondary" className="h-100 rounded-3">Get Started Today</Button></Link>
                </div>
            </div>

            <Container className="w-75 p-5 my-5">
                <Row className="text-center m-5">
                    <p className="fs-1 text-dark">We’d Like to Hear From You</p>
                    <p>Got something to share or see something that doesn’t adhere to our standards? We want to know! <br />We’re always working to improve our site and appreciate feedback.</p>
                </Row>

                    <form onSubmit={handleSubmit} className="contact-form webform">
                        <input type="email" className="form-control " value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required/> 
                        <input type="text" className="form-control" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Subject" required/>
                        <textarea className="form-control" rows="5" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Message" required/>

                        <button type="submit" className="form-control btn btn-secondary" id="submit-button">Send Message</button>
                    </form>
            </Container>

            <ContactUs />

            <Footer />
        </div>
    );
}

export default AboutUs;