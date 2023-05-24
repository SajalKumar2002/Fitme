import React, { useState, useEffect } from 'react';
import axios from '../../http';
import { Link } from 'react-router-dom';

import Footer from "../components/Footer"
import NavBar from "../components/Navbar"

function Supplements() {
    const [supplements, setSupplement] = useState([]);
    const [searchCategory, setSearchCategory] = useState([]);

    const fetchSupplement = async () => {
        if (localStorage.getItem('Supplement')) {
            setSupplement(JSON.parse(localStorage.getItem('Supplement')))
        } else {
            const response = await axios.get('supplement')
            setSupplement(response.data)
            localStorage.setItem('Supplement', JSON.stringify(response.data));
        }
    }

    useEffect(() => {
        fetchSupplement();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchQuery = searchCategory.toLowerCase();
        const response = (await axios.get('/supplement')).data
        setSupplement(response.filter((data) => {
            return data.category === searchQuery
        }))
    }

    return (
        <div>
            <NavBar />

            <div className="input-group-text px-3 py-0">
                <div className="container">
                    <div className="row pb-4">
                        <p className="text-center display-4 fw-lighter text-dark">FitMe Recommended Supplements</p>
                        <form onSubmit={handleSubmit} className="d-md-flex input-group my-auto mx-1 col-12">
                            <input type="search" className="form-control rounded-pill" placeholder="Search" value={searchCategory} onChange={(event) => setSearchCategory(event.target.value)} />
                            <div className="my-auto">
                                <button className="btn btn-dark input-group-text" type="submit">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <section className="py-3">
                <div className=" px-4 px-lg-5 mt-5">
                    <div className="row justify-content-center ">
                        {supplements.map(supplement => (
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
                </div>
            </section>
            <Footer />

        </div>
    );
}

export default Supplements;