import React, { useState, useEffect } from 'react';
import axios from '../../http';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer"
import NavBar from "../components/Navbar"

function Exercises() {
    const [exercises, setExercise] = useState([]);
    const [searchCategory, setSearchCategory] = useState([]);
    const favExercise = []
    const isUser = localStorage.getItem('id') ? true : false

    const fetchExercise = async () => {
        if (localStorage.getItem('Exercise')) {
            setExercise(JSON.parse(localStorage.getItem('Exercise')))
        } else {
            const response = await axios.get('exercise')
            setExercise(response.data)
            localStorage.setItem('Exercise', JSON.stringify(response.data));
        }
    }

    const favouriteExercise = async () => {
        const userid = localStorage.getItem('id')
        const response = await axios.get(`/favourite/${userid}`)
        response.data.favourite.exercise.map(favex => favExercise.push(favex))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchQuery = searchCategory.toLowerCase();
        setExercise(exercises.filter((exercise) => {
            console.log(typeof exercise.name)
            return ((exercise.category).includes(searchQuery) || (exercise.level).includes(searchQuery)) 
        }))
    }

    // const addfavourite = async (exerciseid) => {
    //     if (isUser) {
    //         const response = await axios.post('/favourite/exercise', {
    //             userid: localStorage.getItem('id'),
    //             exerciseid: exerciseid
    //         })
    //         console.log(exerciseid)
    //         if (response.data.success) {
    //             alert("Favourite added successfully")
    //         }
    //     } else {
    //         alert("You need to Sign in")
    //     }
    // }

    // const removefavourite = async (exerciseid) => {
    //     if (isUser) {
    //         const response = await axios.delete('/favourite/exercise', {
    //             userid: localStorage.getItem('id'),
    //             exerciseid: exerciseid
    //         })
    //         console.log(exerciseid)
    //         if (response.data.success) {
    //             alert("Favourite removed successfully")
    //         }
    //     } else {
    //         alert("You need to Sign in")
    //     }
    // }

    useEffect(() => {
        fetchExercise();
        if (isUser) {
            favouriteExercise();
            favExercise.map(exercise => console.log(exercise))
        }
    }, [])

    return (
        <div>
            <NavBar />

            <div className="input-group-text px-3 py-0">
                <div className="container">
                    <div className="row">
                        <p className="text-center display-4 fw-lighter text-dark">FitMe Exercises</p>
                        <form onSubmit={handleSubmit} className="d-md-flex input-group my-auto mx-1 col-12">
                            <input type="search" className="form-control rounded-pill" placeholder="Search" value={searchCategory} onChange={(event) => setSearchCategory(event.target.value)} />
                            <div className="my-auto">
                                <button className="btn btn-dark input-group-text" type="submit" >Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <section className="py-3">
                <div className=" px-4 px-lg-5 mt-5">
                    <div className="row justify-content-center">
                        {exercises.map(exercise => (
                            <div className="card m-1 col-xl-2 col-lg-3 col-md-4 col-sm-5" key={exercise._id}>
                                <img className="card-img-top mt-2" src={exercise.imagelink} alt="..." />
                                <div className="card-body p-4">
                                    <h5 className="fw-bolder mb-0">{exercise.name}</h5>
                                    <div className="fs-6">Muscle Group: {exercise.category}</div>
                                    <div className="fs-6 mb-2">Level: {exercise.level}</div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                                    <Link className="btn btn-outline-dark mt-auto" to={exercise.videolink}>View Exercise</Link>
                                    {/* <button type='button' className='btn btn-light mt-auto' onClick={() => addfavourite(exercise._id)}>Add to Favourite</button>
                                    <button type='button' className='btn btn-secondary mt-auto' onClick={() => removefavourite(exercise._id)}>Remove from Favourite</button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />

        </div>
    );
}

export default Exercises;