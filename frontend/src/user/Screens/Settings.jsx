import React, { useState, useEffect } from 'react';
import axios from '../../http';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';

import Navbar from "../Components/NavBar"

function Settings() {
    let navigate = useNavigate();
    const [userData, setUserData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('UserData')))
        console.log(JSON.parse(localStorage.getItem('UserData')))
    }, [])

    const handleSubmit = async (event) => {
        // console.log(event.target.newpass.value);
        event.preventDefault();
        const response = await axios.post("/auth/changepass", {
            newPassword: event.target.newpass.value,
            username: userData.username
        })
        console.log(response.data);
        if (response.data.success) {
            alert("Password Changed Succesfully")
            window.location.reload()
        } else {
            alert(response.data.message)
        }
    }

    const date = new Date(userData.otpExpiry);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <Navbar />
            <div className='container'>
                <h2>Security Settings</h2>
                <div className='w-50'>

                    <label className="col-sm-2 col-form-label">Email</label>
                    <label className="col-sm-10 col-form-label fs-5">{userData.username}</label>
                    <label className="col-sm-2 col-form-label my-auto">Password</label>
                    <button className='col-sm-10 btn btn-primary m-2' type='button' onClick={handleShow}>Change Password</button>

                    <hr />
                    <div className="form-group ms-2 row">
                        <label className="col-sm-4 col-form-label">Last Changed Password:</label>
                        <label className="col-sm-6 col-form-label fs-5">{formattedDate}</label>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <h3>Change Password</h3>
                <form onSubmit={handleSubmit}>
                    <input type='password' name='newpass' className='form-control' placeholder='New Password' />
                    <button type='Submit' className='btn btn-primary form-control'>Submit</button>
                </form>
            </Modal>
        </>
    )
}

export default Settings;