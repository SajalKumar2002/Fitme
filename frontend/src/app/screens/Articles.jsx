import React, { useState, useEffect } from 'react';
import axios from '../../http';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import NavBar from "../components/Navbar";
import Footer from "../components/Footer";


function Article() {
    const [articles, setArticle] = useState([]);
    const [open, setOpen] = useState(false);

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
        <div>
            <NavBar />

            <div className="input-group-text px-3 py-0">
                <div className="container">
                    <div className="row">
                        <p className="text-center display-4 fw-lighter text-dark">FitMe Articles</p>
                        {/* <form className="d-md-flex input-group my-auto mx-1 col-12">
                            <input type="search" className="form-control rounded-pill" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Search" />
                            <div className="my-auto">
                                <button className="btn btn-dark input-group-text" type="submit">Search</button>
                            </div>
                        </form> */}
                    </div>
                </div>
            </div>

            <section className="section py-2">
                <div className="container">
                    <div className='row'>
                        {articles.map(article => (
                            <div className='col-sm card p-4 m-3' key={article._id}>
                                <h2>{article.Title}</h2>
                                <div className="card card-body">{article.content}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Article;