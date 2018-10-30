import React from 'react';
import Searchbar from './Searchbar';
import Navbar from './Navbar';

const Header = ( {history, setPhotoData} ) => {

    return (
        <div>
            <Searchbar history = {history} setPhotoData={setPhotoData}/>
            <Navbar />
        </div>
    );

}

export default Header;