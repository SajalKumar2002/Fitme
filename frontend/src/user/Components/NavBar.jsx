import React from 'react';
import axios from '../../http';
import { Link, useNavigate } from 'react-router-dom';

function Navbar(props) {
    let navigate = useNavigate();

    const clearLS = async () => {
        const response = await axios.post("/auth/logout");
        if (response) {
            localStorage.removeItem('UserData');
            localStorage.removeItem('id');
            navigate('/login')
        }
        else
            alert("Something went wrong")
    }

    return (
        <nav className="navbar navbar-light bg-dark">
            <div className="container container-fluid d-lg-flex " id="navbar">
                <div className='text-white'>
                    <Link to='/'><h2 className='text-light'>FitMe</h2></Link>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/setting">Settings</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <button type='button' className='btn btn-outline-light' onClick={clearLS} >Sign Out</button>
        </nav>
    )
}

export default Navbar;
