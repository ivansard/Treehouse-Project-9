import React, {Component} from 'react';

class Searchbar extends Component{

    render(){
        return (
            <form>
                <input type="text" placeholder="Search for..."></input>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default Searchbar;