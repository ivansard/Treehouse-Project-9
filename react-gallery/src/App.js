import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Gallery from './components/Gallery';
import apiKey from './config/config';

class App extends Component {

  state = { 
    apiKey: apiKey
  }

  componentDidMount(){
    console.log(this.state.apiKey);
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Gallery />
      </div>
    );
  }
}

export default App;
