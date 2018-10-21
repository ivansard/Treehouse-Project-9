import React from 'react';

const GalleryItem = ({url}) =>{

    return (
        <li>
            <img src={url}></img>
        </li>
    );
}

export default GalleryItem;