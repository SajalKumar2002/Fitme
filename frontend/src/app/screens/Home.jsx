import React, { useState, useEffect } from 'react';
import axios from '../../http';
import { Link, useAsyncError } from "react-router-dom";

import Footer from "../components/Footer"
import NavBar from "../components/Navbar"
import ContactUs from '../components/ContactUs';

function Home() {
    const [supplements, setSupplement] = useState([]);
    const [exercises, setExercise] = useState([]);

    const fetchExercise = async () => {
        await axios.get('/exercise')
            .then((response) => {
                setExercise(response.data);
                localStorage.setItem("Exercise", exercises)
            }).catch(error => {
                console.log(error)
            });
    }

    const fetchSupplement = async () => {
        await axios.get('/supplement')
            .then((response) => {
                setSupplement(response.data);
                localStorage.setItem("Supplement", supplements)
            }).catch(error => {
                console.log(error)
            });
    }

    useEffect(() => {
        fetchExercise()
        fetchSupplement()
    }, [])

    return (
        <>
            <NavBar />

            <section className="hero d-flex flex-column justify-content-center align-items-center">
                <div className="bg-overlay d-flex align-items-center">
                    <div className="container ">
                        <div className="row">
                            <div className="col-12 col-lg-8 col-md-10 mx-auto text-center">
                                <div className="">
                                    <h6>new way to build a healthy lifestyle!</h6>
                                    <h1 className="text-light">Upgrade your body at FitMe</h1>
                                    <Link to="/SignUp" className="btn custom-btn bordered mt-3">Join Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="main-sign-log-container py-5">
                <div className="container">
                    <div className="row text-center">

                        <div className="d-flex flex-column justify-content-center col-md-6 px-4 my-2">
                            <h2 className="mb-3 text-white">New to the FitMe?</h2>

                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Enim quia aut earum at numquam quis ex consequuntur! Iste, a similique?</p>

                            <Link to="/SignUp" className="btn btn-primary mt-3">Become a member today</Link>
                        </div>

                        <div className="d-flex flex-column justify-content-center col-md-6 px-4 my-2">
                            <h2 className="mb-3 text-white">Already a Member</h2>

                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Enim quia aut earum at numquam quis ex consequuntur! Iste, a similique?</p>

                            <Link to="/LogIn" className="btn btn-primary mt-3">Sign in</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about section py-5">
                <div className="container">
                    <div className="row">
                        <div className="mb-lg-0 mb-4 mx-auto col-lg-5 col-md-10 col-12">
                            <h2 className="mb-4">Hello, we are FitMe</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Praesentium dolore tbotam accusantium perferendis est harum ab nihil autem dolorum nisi.</p>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias minus officia quam eligendi
                                adipisci quia facere deleniti asperiores vel.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-12 text-center mb-3">
                            <h6>Get Supplements To</h6>
                            <h2>Support Your Journey</h2>
                        </div>
                        {supplements.slice(-5).map(supplement => (
                            <div className="card m-1 col-lg-2 p-2 m-2 " key={supplement._id}>
                                <img src={supplement.src} className="card-img-top" alt="supplement" />
                                <div className="card-body py-2">
                                    <p className="mb-3 text-dark fw-bold">{supplement.name}</p>
                                    <p className="m-0 text-dark">{supplement.weight}</p>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <p className="m-0 text-dark">{"Rs " + supplement.price}</p>
                                    <Link to={supplement.link}><button type="button" className="btn btn-outline-dark mt-auto">View Supplement</button></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/Supplements" className="btn more-btn mx-auto">More</Link>
                </div>
            </section>

            <section className="section py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-12 text-center mb-3">
                            <h6>Get A Desired Body with</h6>
                            <h2>Our Blaster Workouts</h2>
                        </div>
                        {exercises.slice(-5).map(exercise => (
                            <div className="card m-1 col-lg-2 p-0 m-2" key={exercise._id}>
                                <img className="card-img-top" src={exercise.imagelink} alt="..." />
                                <div className="card-body p-2">
                                    <h5 className="fw-bolder mb-0">{exercise.name}</h5>
                                    <div className="fs-6">Muscle Group: {exercise.category}</div>
                                    <div className="fs-6 mb-2">Level: {exercise.level}</div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center"><Link className="btn btn-outline-dark mt-auto" to={exercise.videolink}>View Exercise</Link></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/exercises" className="btn more-btn mx-auto">More</Link>
                </div>
            </section>

            <ContactUs />

            <Footer />

        </>
    );
}

export default Home;