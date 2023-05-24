import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../http';

import Navbar from "../Components/NavBar"

function Dashboard() {
    const navigate = useNavigate();
    const [isuser, setIsuser] = useState(false);
    const [userData, setUserData] = useState([]);

    const fetchuser = async () => {
        const id = localStorage.getItem('id');
        const response = await axios.get(`/auth/userid/${id}`)
        if (response.data.success) {
            setIsuser(response.data.success)
            localStorage.setItem('UserData', JSON.stringify(response.data.userexists));
            setUserData(JSON.parse(localStorage.getItem('UserData')))
        } else {
            alert(response.data.message);
            navigate("/login");
        }
    }

    useEffect(() => {
        fetchuser()
    }, [])

    if (isuser) {
        return (
            <>
                <Navbar />
                <div className='container'>
                    <h2>{(userData.username)}</h2>
                </div>
            </>
        )
    }
    else {
        return (
            <h2>Error 404: Page Not Found</h2>
        )
    }
}

export default Dashboard;
