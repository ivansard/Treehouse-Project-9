import React from 'react';

const GalleryItem = ({url}) =>{

    return (
        <li>
            <img src={url} alt="Generated gallery item"></img>
        </li>
    );
}

export default GalleryItem;