import React, { useState, useEffect } from 'react';

function MainContent(props) {
    const [data, setData] = useState(props.user)

    return (
        <div className='d-flex flex-column justify-content-center' style={{ height: "80vh" }}>
            <h2 className='text-center'>Welcome Admin {(data.username).substring(0, (data.username).indexOf('@'))}</h2>
        </div>
    )
}

export default MainContent;