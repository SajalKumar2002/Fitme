// eslint-disable-next-line
import React from 'react';
import { Link } from 'react-router-dom';

function SidePanel() {
    return (
      <div className="col-2 p-4 pt-2 bg-secondary" style={{ height: "100vh" }}>
        <p className='fs-2 text-center text-black'>Admin</p>
        <hr />
        <div className='d-flex flex-column' style={{ height: "65vh" }}>
          <>
            <button className='btn rounded-0 m-1 fw-light btn-secondary' ><Link to="/admin" className='text-white'>Dashboard</Link></button>
            <button className='btn rounded-0 m-1 fw-light btn-secondary'><Link to="/admin/supplement" className='text-white'>Supplements</Link></button>
            <button className='btn rounded-0 m-1 fw-light btn-secondary'><Link to="/admin/exercise" className='text-white'>Exercises</Link></button>
            <button className='btn rounded-0 m-1 fw-light btn-secondary' ><Link to="/admin/article" className='text-white'>Articles</Link></button>
            <button className='btn rounded-0 m-1 fw-light btn-secondary' ><Link to="/admin/contact" className='text-white'>Message</Link></button>
            <hr />
            <button className='btn rounded-0 m-1 fw-light btn-secondary' ><Link to="/admin/profile" className='text-white'>Profile</Link></button>
            <button className='btn rounded-0 m-1 fw-light btn-secondary' ><Link to="/admin/setting" className='text-white'>Settings</Link></button>
          </>
        </div>
      </div>
    )
}

export default SidePanel;