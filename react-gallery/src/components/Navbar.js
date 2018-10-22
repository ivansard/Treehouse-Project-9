import React from 'react';
import { NavLink, Router} from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="/pugs">PUGS</NavLink></li>
                <li><NavLink to="/boobs">BOOBS</NavLink></li>
                <li><NavLink to="/bulldogs">BULLDOGS</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;