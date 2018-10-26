import React, {Component} from 'react';
import Searchbar from './Searchbar';
import Navbar from './Navbar';

const Header = ({performSearch}) => {

    return (
        <div>
            <Searchbar performSearch={performSearch}/>
            <Navbar />
        </div>
    );
    
}

export default Header;