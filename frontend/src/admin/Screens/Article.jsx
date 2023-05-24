import React, { useState, useEffect } from 'react';
import axios from '../../http';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Navbar from "../Components/NavBar";
import SidePanel from "../Components/SidePanel"
import ArticleForm from '../Components/ArticleForm';

function Article() {
    const [articles, setArticle] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const handleAddClose = () => setShowAddModal(false);
    const handleAddShow = () => setShowAddModal(true);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleUpdateClose = () => setShowUpdateModal(false);
    const handleUpdateShow = (article) => {
        setSelectedArticle(article);
        setShowUpdateModal(true);
    }

    const fetchArticles = async () => {
        try {
            const response = await axios.get('/article');
            setArticle(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, []);

    const Delete = async (id) => {
        try {
            const response = await axios.delete(`/article/${id}`);
            if (response.data.success) {
                alert("Success");
                fetchArticles();
            } else {
                alert("Something Went Wrong");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container-fluid container-full-height">
                <div className="row">
                    <SidePanel />
                    <div className="col-md-10 p-0">
                        <Navbar />

                        <div className='m-3'>
                            <div className='d-flex flex-row justify-content-between mb-2'>
                                <h3 className='mb-2'>Article Table</h3>
                                <Button variant="primary" onClick={handleAddShow}>Compose</Button>
                            </div>
                            <Modal show={showAddModal} onHide={handleAddClose}>
                                <ArticleForm action="add" />
                            </Modal>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <td>Title</td>
                                        <td>Content</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles.map(article => (
                                        <tr key={article._id}>
                                            <td>{article.Title}</td>
                                            <td>{article.content}</td>
                                            <td className='d-flex flex-column'>
                                                <button className='btn btn-secondary mt-1' type='button' onClick={() => handleUpdateShow(article)}>Update</button>
                                                <button className='btn btn-secondary mt-1' type='button' onClick={() => Delete(article._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Modal show={showUpdateModal} onHide={handleUpdateClose}>
                            <ArticleForm article={selectedArticle} />
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Article;
