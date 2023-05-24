import React, { useState, useEffect } from 'react';
import axios from '../../http';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Navbar from "../Components/NavBar";
import SidePanel from "../Components/SidePanel"
import SupplementForm from "../Components/SupplementForm"

function Supplement() {
    const [supplements, setSupplement] = useState([]);
    const [selectedSupplement, setSelectedSupplement] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const handleAddClose = () => setShowAddModal(false);
    const handleAddShow = () => setShowAddModal(true);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleUpdateClose = () => setShowUpdateModal(false);
    const handleUpdateShow = (supplement) => {
        setSelectedSupplement(supplement);
        setShowUpdateModal(true);
    }


    const fetchSupplements = async () => {
        try {
            const response = await axios.get('/supplement');
            setSupplement(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSupplements();
    }, []);

    const Delete = async (id) => {
        try {
            const response = await axios.delete(`/supplement/${id}`);
            if (response.data.success) {
                alert("Success");
                fetchSupplements();
            } else {
                alert("Something Went Wrong");
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <SidePanel />
                    <div className="col-md-10 p-0">
                        <Navbar />

                        <div className='m-3' >
                            <div className='d-flex flex-row justify-content-between mb-2'>
                                <h3 className='mb-2'>Supplement Table</h3>
                                <Button variant="primary" onClick={handleAddShow}>Add Supplement</Button>
                            </div>
                            <Modal show={showAddModal} onHide={handleAddClose}>
                                <SupplementForm action="add" />
                            </Modal>
                            <table className='table table-bordered '>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Price(Rs)</td>
                                        <td>Category</td>
                                        <td>Link</td>
                                        <td>Image</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {supplements.map(supplement => (
                                        <tr key={supplement._id}>
                                            <td>{supplement.name}</td>
                                            <td>{supplement.price}</td>
                                            <td>{supplement.category}</td>
                                            <td>
                                                <Link to={supplement.link} target='_blank'>{supplement.category}</Link>
                                            </td>
                                            <td><img src={supplement.src} style={{ height: "9rem" }} alt={supplement.category} /></td>
                                            <td className='d-flex flex-column'>
                                                <button className='btn btn-secondary mt-1' type='button' onClick={() => handleUpdateShow(supplement)}>Update</button>
                                                <button className='btn btn-secondary mt-1' type='button' onClick={() => Delete(supplement._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

            <Modal show={showUpdateModal} onHide={handleUpdateClose}>
                <SupplementForm supplement={selectedSupplement} />
            </Modal>
        </>
    )
}

export default Supplement;
