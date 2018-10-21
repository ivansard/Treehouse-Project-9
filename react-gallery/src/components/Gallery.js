import React from 'react';
import GalleryItem from './GalleryItem';
import NoResults from './NoResults';

const Gallery = ({photoData}) => {

    //Variable which will contain the URLs of all the photos
    let photos;

    //If we have obtained results, then map the photo array to an url array
    if(photoData.length > 0){
        photos = photoData.map(photo => <GalleryItem url={photo.url} key={photo.id}/>)
    } else {
        photos = <NoResults />
    }



    return (
        <div>
            <h1>This will contain the gallery items</h1>
            {photos}
        </div>
    )
}

export default Gallery;