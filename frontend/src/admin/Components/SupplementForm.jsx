import React, { useState } from 'react';
import axios from "../../http";

function SupplementForm(props) {

    const [name, setName] = useState(props.supplement?.name || '');
    const [price, setPrice] = useState(props.supplement?.price || '');
    const [category, setCategory] = useState(props.supplement?.category || '');
    const [link, setLink] = useState(props.supplement?.link || '');
    const [src, setSrc] = useState(props.supplement?.src || '');

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('/supplement/add', {
            name: name,
            category: category,
            price: price,
            src: src,
            link: link
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
        const response = await axios.patch(`/supplement/${props.supplement._id}`, {
            name: name,
            category: category,
            price: price,
            src: src,
            link: link
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
            <input type="text" className="form-control mt-1" placeholder="Price" name="price" value={price} onChange={e => setPrice(e.target.value)} required />
            <input type="text" className="form-control mt-1" placeholder="Image" name="src" value={src} onChange={e => setSrc(e.target.value)} required />
            <input type="text" className="form-control mt-1" placeholder="Hyperlink" name="link" value={link} onChange={e => setLink(e.target.value)} required />
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
}

export default SupplementForm;
