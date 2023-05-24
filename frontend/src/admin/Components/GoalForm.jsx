import React, { useState, useEffect } from 'react';
import axios from "../../http";
import Modal from 'react-bootstrap/Modal';

function GoalForm() {
    const [exercises, setExercise] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);

    const handleSubmit = async (event) => {
        const response = await axios.post("/goal/add", {
            username: event.target.username.value,
        })
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

    return (
        <div>
            <h2>Goal Form</h2>
            <form onSubmit={handleSubmit}>
                <div className='d-flex justify-content-center'>
                    <form className='overflow-auto'>
                        <input type="text" className="form-control mt-1" placeholder="Name" name="name" required />
                        <input type="text" className="form-control mt-1" placeholder="Main Goal" name="maingoal" required />
                        <select className="form-control mt-1" name="level" required>
                            <option value="" disabled selected>Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advance">Advance</option>
                        </select>
                        <input type="file" className="form-control mt-1" placeholder="Image" name="src" />
                        <input className='form-control mt-1' name='programduration' placeholder='Program Duration' required />
                        <input className='form-control mt-1' name='programduration' placeholder='Days per Week' required />
                        <table>
                            <tbody>
                                {exercises.map(exercise => (
                                    <tr key={exercise._id}>
                                        <td><p className='fs-6 m-0'>{exercise.name}</p></td>
                                        <td><button className='btn btn-secondary'>+</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </form>
        </div>
    )
}

export default GoalForm;
