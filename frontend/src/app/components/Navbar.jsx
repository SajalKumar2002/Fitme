import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from '../../http';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar() {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('UserData')));
    let navigate = useNavigate();

    const clearLS = async () => {
        const response = await axios.post("/auth/logout");
        if (response) {
            localStorage.clear();
            window.location.reload()
        }
        else
            alert("Something went wrong")
    }

    // useEffect(() => {
    //     console.log(userData);
    // }, [])

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="sticky" className="p-2">
            <Container>
                <Navbar.Brand href="/">FitMe</Navbar.Brand>
                <div>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Exercises" className="nav-link">Exercises</Nav.Link>
                        <Nav.Link href="/Supplements" className="nav-link">Supplements</Nav.Link>
                        <Nav.Link href="/Tools" className="nav-link">Tools</Nav.Link>
                        <Nav.Link href="/Articles" className="nav-link">Articles</Nav.Link>
                        <Nav.Link href="/About" className="nav-link">About Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {localStorage.getItem('UserData') ? (
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">{userData.name || (userData.username).substring(0, 1)}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {/* <Dropdown.Item href={`/${userData.role}`}>Dashboard</Dropdown.Item> */}
                            <Dropdown.Item href={`/${userData.role}/profile`}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={clearLS}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Link to='/Login' className='text-white btn '>
                        Sign in
                    </Link>
                )}
            </Container>
        </Navbar>
    );
}

export default NavigationBar;