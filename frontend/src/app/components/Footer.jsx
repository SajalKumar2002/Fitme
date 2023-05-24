import React, { useState, useEffect } from 'react';
import axios from '../../http';
import { Link } from "react-router-dom";

function Footer() {
    const [articles, setArticle] = useState([]);
    useEffect(() => {
        axios.get('/article')
            .then((response) => {
                setArticle(response.data);
            })
            .catch(error => {
                console.log(error)
            });
    }, [])

    return (
        <div className="footer bg-dark">
            <div className="container text-secondary">
                <div className="mx-5 p-1">
                    <div className="my-5 d-flex row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 my-2">

                            <h4 className="text-uppercase text-light mb-4">Get In Touch</h4>
                            <div className="mb-2 ps-2 text-break">
                                <p className="mb-0">Lucknow, Uttar Pradesh, India</p>
                            </div>
                            <div className="mb-2 ps-2 text-break">
                                <p className="mb-0">FitMe@Company.com</p>
                            </div>
                            <div className="mb-2 ps-2">
                                <p className="mb-0">+91 1234567890</p>
                            </div>
                            <div className="mt-4 ps-2">
                                <Link className="btn me-2" to="https://www.facebook.com/"><img src="/icon/Facebook.png" className="fab fa-twitter" alt="icon"></img></Link>
                                <Link className="btn me-2" to="https://www.instagram.com/"><img src="/icon/Instagram.png" className="fab fa-facebook-f" alt="icon"></img></Link>
                                <Link className="btn me-2" to="https://twitter.com"><img src="/icon/Twitter.png" className="fab fa-linkedin-in" alt="icon"></img></Link>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 my-2">
                            <Link to="/Articles">
                                <h4 className="text-uppercase text-light mb-4">Popular Articles</h4>
                            </Link>
                            <div className="d-flex flex-column justify-content-start">
                                {articles.slice(-2).map(article => (
                                    <Link className=" mb-2 nav-item nav-link" key={article._id} to={"/article/" + article._id}>{article.Title}</Link>
                                ))}
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 my-2">
                            <h4 className="text-uppercase text-light mb-4">Popular Links</h4>
                            <div className="d-flex flex-column justify-content-start">
                                <Link className="text-secondary mb-2" to="/">Home</Link>
                                <Link className="text-secondary mb-2" to="/Supplements">Supplements</Link>
                                <Link className="text-secondary mb-2" to="/Exercises">Exercises</Link>
                                <Link className="text-secondary mb-2" to="/Tools">Tools</Link>
                                <Link className="text-secondary mb-2" to="/About">About Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;