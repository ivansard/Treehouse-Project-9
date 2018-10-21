import React from 'react';
import { NavLink, Router} from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="#">Breaking Bad</NavLink></li>
                <li><NavLink to="#">Game of thrones</NavLink></li>
                <li><NavLink to="#">The Wire</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;