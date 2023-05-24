import React, { useState } from 'react';
import axios from '../../http';

function Compose(props) {
    const [title, setTitle] = useState(props.article?.Title || '');
    const [content, setContent] = useState(props.article?.content || '');

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('/article/add', {
            title: title,
            content: content
        })
        console.log(response);
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
        const response = await axios.patch('/article/${props.article._id}', {
            title: title,
            content: content
        })
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
            <label>Title</label>
            <input className="form-control" type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required />
            <label>Post</label>
            <textarea className="form-control" rows="5" cols="30" name="content" value={content} onChange={e => setContent(e.target.value)} required />
            <button className="btn btn-primary mt-3" type="submit">Save</button>
        </form>
    );
}

export default Compose;
