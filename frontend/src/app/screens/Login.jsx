import React, { useState, useEffect } from 'react';
import axios from '../../http';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';

import Footer from "../components/Footer"
import NavBar from "../components/Navbar"

const Login = () => {
    let navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('UserData'));
    console.log(userData)

    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [showOTPModal, setShowOTPModal] = useState(false)
    const handleOTPClose = () => setShowOTPModal(false);
    const handleOTPShow = () => setShowOTPModal(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post("/auth/login", {
            username: event.target.username.value,
            password: event.target.password.value
        })
        console.log(response.data)
        if (response.data.success && response.data.role === "admin") {
            localStorage.setItem('id', response.data.id);
            navigate("/admin");
        } else if (response.data.success && response.data.role === "user") {
            localStorage.setItem('id', response.data.id);
            navigate(`/user/profile`);
        } else {
            alert("Invalid Email or Password");
            window.location.reload();
        }
    }

    const sendEmail = async (event) => {
        event.preventDefault();
        const response = await axios.post("/auth/forgotpassword", {
            username: event.target.username.value
        })
        if (response.data.success) {
            alert("OTP sent to your email")
            handleClose();
            handleOTPShow();
        } else {
            alert(response.data.message)
        }
    }

    const sendOTP = async (event) => {
        event.preventDefault();
        const response = await axios.post("/auth/checkotp", {
            otp: event.target.otp.value
        })
        console.log(response.data);
        if (response.data.success && response.data.role === "admin") {
            localStorage.setItem('id', response.data.id);
            navigate("/admin");
        } else if (response.data.success && response.data.role === "user") {
            localStorage.setItem('id', response.data.id);
            navigate(`/user/profile`);
        } else {
            alert(response.data.message)
            window.location.reload();
        }
    }

    useEffect(() => {
        if (userData) {
            navigate(`/${userData.role}`)
        }
    }, [])

    return (
        <>
            <NavBar />

            <section className="registration-form">
                <div className="container col-lg-4 col-md-4 col-sm-6">
                    <div className="p-sm-1 w-100">
                        <h3 className="text-center my-0">Login to your Account</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="email" name="username" className="form-control rounded-3" placeholder="Email" required autoComplete='off' />
                            <input type="password" name="password" className="form-control rounded-3 mb-0" placeholder="Password" />
                            <div className='m-0 justify-content-end d-flex'><button className='btn p-0 btn-sm' type='button' onClick={handleShow}>Forgot Password</button></div>
                            <p className="m-0 text-center">Don't have a Account?<Link to="/SignUp">Sign Up</Link></p>
                            <button type="submit" className="btn btn-primary form-control rounded-3 m-0 mt-2">Submit</button>
                        </form>
                    </div>
                </div>
            </section>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password</Modal.Title>
                </Modal.Header>
                <div className='p-3'>
                    <form onSubmit={sendEmail}>
                        <input type="email" name="username" className="form-control rounded-3" placeholder="Email" required autoComplete='off'/>
                        <button type="submit" className="btn btn-primary form-control rounded-3 m-0 mt-2">Submit</button>
                    </form>
                </div>
            </Modal>
            <Modal show={showOTPModal} onHide={handleOTPClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter OTP</Modal.Title>
                </Modal.Header>
                <div className='p-3'>
                    <form onSubmit={sendOTP}>
                        <input type="text" name="otp" className="form-control rounded-3" placeholder="OTP" required />
                        <button type="submit" className="btn btn-primary form-control rounded-3 m-0 mt-2">Submit</button>
                    </form>
                </div>
            </Modal>

            <Footer />
        </>

    );
}

export default Login;