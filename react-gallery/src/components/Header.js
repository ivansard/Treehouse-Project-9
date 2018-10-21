import React, {Component} from 'react';
import Searchbar from './Searchbar';
import Navbar from './Navbar';

class Header extends Component {

    render(){
        return (
            <div>
                <Searchbar />
                <Navbar />
            </div>
        );
    }
}

export default Header;