import React, { useState, useEffect } from 'react';
import axios from '../../http';

import { Link } from 'react-router-dom';

import SidePanel from '../Components/SidePanel';
import Navbar from '../Components/NavBar';

function Profile() {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('UserData')));

    const fetchuser = async () => {
        const id = localStorage.getItem('id');
        const response = await axios.get(`/auth/userid/${id}`)
        if (response.data.success) {
            localStorage.setItem('UserData', JSON.stringify(response.data.userexists));
            setUserData(JSON.parse(localStorage.getItem('UserData')))
        } else {
            alert(response.data.message);
            // navigate("/login");
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.patch("/auth/update", {
            username: userData.username,
            name: event.target.name.value,
            gender: event.target.gender.value,
            age: Number(event.target.age.value),
            height: Number(event.target.height.value),
            weight: Number(event.target.weight.value),
            targetWeight: Number(event.target.goalWeight.value),
            weeklyGoal: Number(event.target.weeklyGoal.value),
            activityLevel: Number(event.target.activityLevel.value)
        })
        console.log(response.data)
        if (response.data.success) {
            alert(response.data.message)
        } else {
            alert(response.data.message)
        }
        fetchuser()
    }

    useEffect(() => {
        fetchuser()
        console.log(userData);
    }, [])

    const date = new Date(userData.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <div className="container-fluid container-full-height">
                <div className="row">
                    <SidePanel />
                    <div className="col-md-10 p-0">
                        <Navbar />
                        <form onSubmit={handleSubmit}>
                            <div className='mx-5 row'>
                                <p className='text-dark font-weight-normal fs-1'>Basic Information</p>
                                <div className='p-4 d-flex'>

                                    <div className='col-lg-8 col-md-7 me-4 p-3 card'>
                                        <p className='text-black fs-5 font-weight-bold'>My Account Details</p>
                                        <hr />
                                        <div className='row m-0'>
                                            <div className='col-3 p-0 form-group'>
                                                <p className='text-black fs-5 my-3 form-control border-0'>Email:</p>
                                                <p className='text-black fs-5 my-3 form-control border-0'>Name:</p>
                                            </div>
                                            <div className='col-9 form-group'>
                                                <input type='text' className='text-black form-control border-0' defaultValue={userData.username} readOnly />
                                                <input type='text' className='text-black form-control' name="name" defaultValue={userData.name} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='row m-0'>
                                            <div className='col-3 p-0'>
                                                <p className='text-black fs-5 my-3 form-control border-0' >Target Weight:</p>
                                                <p className='text-black fs-5 my-3 form-control border-0' >Weekly Goal:</p>
                                                <p className='text-black fs-5 my-3 form-control border-0' >Activity Level:</p>
                                            </div>
                                            <div className='col-9 form-group'>
                                                <input type='text' className='text-black form-control' name='goalWeight' defaultValue={userData.targetWeight} placeholder='Weight(in Kg)' />
                                                <input type='text' className='text-black form-control' name='weeklyGoal' defaultValue={userData.weeklyGoal} placeholder='' />
                                                <select className='form-control' name='activityLevel' defaultValue={userData.activityLevel}>
                                                    <option disabled>Select</option>
                                                    <option value='Beginner'>Beginner</option>
                                                    <option value='Intermediate'>Intermediate</option>
                                                    <option value='Advance'>Advance</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type='submit' className='btn btn-primary'>Submit</button>
                                    </div>

                                    <div className='col-lg-4 col-md-5'>
                                        <div className='card'>
                                            <div className='text-center'>
                                                <button type='button' className='btn' >
                                                    {/* <input type='file' accept='image/*' id='user_image' /> */}
                                                    <img src={userData.avatar.url || 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png'} className='rounded-circle' style={{ width: 200, height: 200 }} alt='UserImage' />
                                                </button>
                                            </div>
                                            <div className='p-4 text-center container'>
                                                <h5>{userData.name || userData.username}</h5>
                                                <h5><strong>Member Since:</strong> {formattedDate}</h5>
                                                <div className='p-3'>
                                                    <div className='row'><hr />
                                                        <div className='col-sm p-0'>
                                                            <div className=''>
                                                                <input type='text' className='m-0 form-control' name='height' defaultValue={userData.height} placeholder='--' />
                                                                <p className='text-black m-0'>Height</p>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm p-0'>
                                                            <div className=''>
                                                                <input type='text' className='m-0 form-control' name='weight' defaultValue={userData.weight} placeholder='--' />
                                                                <p className='text-black m-0'>Weight(In Kg)</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm p-0'>
                                                            <div className=''>
                                                                <input type='text' className='m-0 form-control' name='age' defaultValue={userData.age} placeholder='--' />
                                                                <p className='text-black m-0'>Age(In years)</p>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm p-0'>
                                                            <select className='form-control m-0' name='gender' defaultValue={userData.gender} placeholder='--' >
                                                                <option disabled>Select</option>
                                                                <option value='Male'>Male</option>
                                                                <option value='Female'>Female</option>
                                                            </select>
                                                            <p className='text-black m-0'>Gender</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;