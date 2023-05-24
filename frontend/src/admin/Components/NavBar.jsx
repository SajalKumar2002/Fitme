import React from "react";
import axios from '../../http';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    let navigate = useNavigate();

    const clearLS = async () => {
        const response = await axios.post("/auth/logout");
        if (response) {
            localStorage.removeItem('UserData');
            localStorage.removeItem('id');
            navigate('/login')
        } else
            alert("Something went wrong")
    }
    return (
        <div className='py-3 px-4 bg-dark d-flex justify-content-between w-100 m-0'>
            <Link to="/"><h2 className='text-white fw-light'>FitMe</h2></Link>
            <button type='button' className='btn btn-light' onClick={clearLS}>Sign Out</button>
        </div>
    );
}

export default Navbar;