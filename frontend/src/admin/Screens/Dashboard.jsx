import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../http';

import SidePanel from '../Components/SidePanel';
import Navbar from '../Components/NavBar';

function Dashboard() {
  const navigate = useNavigate();
  const [isadmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState([]);

  const fetchadmin = async () => {
    const id = localStorage.getItem('id')
    const response = await axios.get(`/auth/userid/${id}`)
    if (response.data.success) {
      setIsAdmin(response.data.success)
      localStorage.setItem('UserData', JSON.stringify(response.data.userexists));
      setUserData(JSON.parse(localStorage.getItem('UserData')))
    } else {
      alert(response.data.message);
      navigate("/login");
    }
  }

  const fetchuser = async () => {
    const response = await axios.get("/auth/user")
    setUser(response.data)
  }

  useEffect(() => {
    fetchadmin()
    fetchuser()
  }, [])

  if (isadmin) {
    return (
      <div className="container-fluid container-full-height">
        <div className="row">
          <SidePanel />
          <div className="col-md-10 p-0">
            <Navbar />
            <div className='m-3 p-4 card'>
              <h3>Users</h3>
              <table className='table table-bordered '>
                <thead className='bg-primary text-white'>
                  <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Age</td>
                    <td>Gender</td>
                    <td>Created At</td>
                  </tr>
                </thead>
                <tbody>
                  {user.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.age}</td>
                      <td>{user.gender}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', })}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (<h2>Page Not Found</h2>)
  }
}


export default Dashboard;
