import React, { useState } from 'react';
import axios from "../../http";

function ExerciseForm(props) {

    const [name, setName] = useState(props.exercise?.name || '');
    const [category, setCategory] = useState(props.exercise?.category || '');
    const [level, setLevel] = useState(props.exercise?.level || '');
    const [image, setImage] = useState(props.exercise?.imagelink || '');
    const [video, setVideo] = useState(props.exercise?.videolink || '');

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('/exercise/add', {
            name: name,
            category: category,
            level: level,
            image: image,
            video: video
        });
        if (response.data.success) {
            alert("Success");
            handleClose();
            window.location.reload();
        } else {
            alert(response.data.message);
        }
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.patch(`/exercise/${props.exercise._id}`, {
            name: name,
            category: category,
            level: level,
            image: image,
            video: video
        });
        if (response.data.success) {
            alert("Success");
            handleClose();
            window.location.reload();
        } else {
            alert(response.data.message);
        }
    }

    const handleSubmit = props.action === "add" ? handleAddSubmit : handleUpdateSubmit;

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="form-control mt-1" placeholder="Name" name="name" value={name} onChange={e => setName(e.target.value)} required />
            <input type="text" className="form-control mt-1" placeholder="Category" name="category" value={category} onChange={e => setCategory(e.target.value)} required />
            <select className="form-control mt-1" value={level} onChange={e => setLevel(e.target.value)} required>
                <option value="" disabled selected>Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advance">Advance</option>
            </select>
            <input type="text" className="form-control mt-1" placeholder="Image Link" name="image" value={image} onChange={e => setImage(e.target.value)} required />
            <input type="text" className="form-control mt-1" placeholder="Video Link" name="video" value={video} onChange={e => setVideo(e.target.value)} required />
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
}

export default ExerciseForm;
