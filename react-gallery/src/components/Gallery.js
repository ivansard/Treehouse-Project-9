import React from 'react';
import {Redirect, NavLink, Route} from 'react-router-dom';
import GalleryItem from './GalleryItem';
import NoResults from './NoResults';

const Gallery = ({setData, data, match, searchTag, currentSearchTag}) => {

    //Checking for the presence of a search tag, if it's falsey (e.g. null, or empty string), it will be in the match object
    if(!searchTag){
        searchTag = match.params.tag;
    }
    console.log(searchTag);

    if(searchTag !== currentSearchTag || data.length === 0){
        setData(searchTag)
    }

    console.log(data);

    //Variable which will contain the URLs of all the photos
    let photos;

    //If we have obtained results, then map the photo array to an url array
    if(data.length > 0){
        photos = data.map(photo => <GalleryItem url={photo.url} key={photo.id}/>)
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