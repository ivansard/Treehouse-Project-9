import React, { Component } from 'react';
import './App.css';

//React-router imports
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import Header from './components/Header';
import Gallery from './components/Gallery';
import apiKey from './config/config';
import axios from 'axios';

class App extends Component {

  state = { 
    apiKey: apiKey,
    photoData: []
  }

  componentDidMount(){
    this.setDefaultImages();
  }

  setDefaultImages(){
    const apiKey = this.state.apiKey;

    const url = `https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=california&format=json&per_page=24&page=1&nojsoncallback=1`;

    axios.get(url)
    .then(response => {
      //Fetching the photo data
      const photos = response.data.photos.photo;
      //Creating URLs of the photos based on the data
      const photoData = photos.map(photo => {
        return {
          url: `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`,
          id: photo.id
        }
      })

      //Setting the image URLs in the state
      this.setState({
        photoData: photoData
      })
    })
    .catch(function (error) {
      console.log('Error fetching data from Flickr', error);
    });
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Gallery photoData={this.state.photoData}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
