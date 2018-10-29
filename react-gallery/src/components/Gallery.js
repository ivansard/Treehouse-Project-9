import React from 'react';
import {Redirect, NavLink, Route} from 'react-router-dom';
import GalleryItem from './GalleryItem';
import NoResults from './NoResults';

const Gallery = ({setData, data, match, currentSearchTag, loading}) => {

    //Checking if we are on the search path
    if(match.path === "/search/:tag"){
        //Extracting the search tag from the URL
        const searchTag = match.params.tag 
        //If the search tag is different than the current one, fetch the data from the API
        if(searchTag !== currentSearchTag){
            setData(searchTag)
        }
    }

    //Generate an array of photo data, from the data aquired from the API
    let photos = data.map(photo => {
        return {
          url: `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`,
          id: photo.id
        }
    });

    //Creating the GalleryItem elements if the data has been successfully retrieved
    //Or generating the NoResults component if there is no data
    if(photos.length > 0){
        photos = photos.map(photo => <GalleryItem url={photo.url} key={photo.id}/>)
    } else {
        photos = <NoResults />
    }

    return (
        <div className="photo-container">
            <ul>
                {loading ? 
                 <p>Loading photos</p>
                 : photos
                }
            </ul>
        </div>
    )
}

export default Gallery;