import React, { useState, useEffect } from 'react';
import axios from '../../http';
import Navbar from "../Components/NavBar";
import SidePanel from "../Components/SidePanel"

function Contact() {
    const [messages, setMessage] = useState([]);

    useEffect(() => {
        axios.get('/contact')
            .then((response) => {
                setMessage(response.data);
            })
            .catch(error => {
                console.log(error)
            });
    })

    const Delete = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`/contact/${id}`);
            if (response.data.success) {
                alert("Success");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container-fluid container-full-height">
                <div className="row">
                    <SidePanel />
                    <div className="col-md-10 p-0">
                        <Navbar />
                        <div className='m-2'>

                            <div className='m-3'>
                                <h3 className='mb-2'>Message Table</h3>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <td>Email</td>
                                            <td>Subject</td>
                                            <td>Message</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {messages.map(message => (
                                            <tr key={message._id}>
                                                <td>{message.email}</td>
                                                <td>{message.subject}</td>
                                                <td>{message.message}</td>
                                                <td className='d-flex'><button className='btn btn-primary' onClick={() => Delete(message._id)}>Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;