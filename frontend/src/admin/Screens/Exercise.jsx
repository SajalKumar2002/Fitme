import React, { useState, useEffect } from 'react';
import axios from '../../http';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import SidePanel from "../Components/SidePanel"
import Navbar from "../Components/NavBar";
import ExerciseForm from "../Components/ExerciseForm"

function Exercises() {
    const [exercises, setExercise] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const handleAddClose = () => setShowAddModal(false);
    const handleAddShow = () => setShowAddModal(true);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleUpdateClose = () => setShowUpdateModal(false);
    const handleUpdateShow = (exercise) => {
        setSelectedExercise(exercise);
        setShowUpdateModal(true);
        fetchExercises();
    }

    const fetchExercises = async () => {
        try {
            const response = await axios.get('/exercise')
            setExercise(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchExercises();
    }, []);

    const Delete = async (id) => {
        try {
            const response = await axios.delete(`/exercise/${id}`);
            if (response.data.success) {
                alert("Success");
                fetchExercises();
            } else {
                alert("Something Went Wrong");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="container-fluid container-full-height">
                <div className="row">
                    <SidePanel />
                    <div className="col-md-10 p-0">
                        <Navbar />

                        <div className='m-3'>
                            <div className='d-flex flex-row justify-content-between mb-2'>
                                <h3 className='mb-2'>Exercise Table</h3>
                                <Button variant="primary" onClick={handleAddShow}>Add Exercise</Button>
                            </div>
                            <Modal show={showAddModal} onHide={handleAddClose}>
                                <ExerciseForm action="add" />
                            </Modal>
                            <table className='table table-bordered '>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Category</td>
                                        <td>Level</td>
                                        <td>Image</td>
                                        <td>Video</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exercises.map(exercise => (
                                        <tr key={exercise._id}>
                                            <td>{exercise.name}</td>
                                            <td>{exercise.category}</td>
                                            <td>{exercise.level}</td>
                                            <td><img src={exercise.imagelink} style={{ height: "4rem" }} alt={exercise.category} /></td>
                                            <td>
                                                <Link to={exercise.videolink} target='_blank'>
                                                    <button type='button' className='btn btn-dark'>View</button>
                                                </Link>
                                            </td>
                                            <td className='d-flex flex-column'>
                                                <button className='btn btn-secondary mt-1' type='button' onClick={() => handleUpdateShow(exercise)}>Update</button>
                                                <button className='btn btn-secondary mt-1' type='button' onClick={() => Delete(exercise._id)}>Delete</button>
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
                <ExerciseForm exercise={selectedExercise} />
            </Modal>
        </div>
    );
}

export default Exercises;
