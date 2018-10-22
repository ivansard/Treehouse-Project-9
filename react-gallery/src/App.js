import React, { Component } from 'react';
import './App.css';

//React-router imports
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
//Component imports
import Header from './components/Header';
import Gallery from './components/Gallery';
import Home from './components/Home';
//Api key and axios imports
import apiKey from './config/config';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = { 
      apiKey: apiKey,
      currentSearchTag: '',
      photos: []
    }
    this.setPhotoData = this.setPhotoData.bind(this);
  }


  componentDidMount(){
    // if(this.state.photos.length === 0){
    //   this.setPhotoData('cats')
    // }
  }

  setPhotoData(searchTag){
    const apiKey = this.state.apiKey; 

    const url = `https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=${searchTag}&format=json&per_page=24&page=1&nojsoncallback=1`;

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
      this.setState( prevState => {
        return {
          photos: photoData,
          currentSearchTag: searchTag
        }
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
          <Route exact path="/" component={Home}/>
          <Route exact path="/pugs" render={ props => <Gallery {...props} setData={this.setPhotoData} data={this.state.photos} searchTag="pugs" currentSearchTag={this.state.currentSearchTag}/>}/>
          <Route exact path="/boobs" render={ props => <Gallery {...props} setData={this.setPhotoData} data={this.state.photos} searchTag="boobs" currentSearchTag={this.state.currentSearchTag}/>}/>
          <Route exact path="/bulldogs" render={ props => <Gallery {...props} setData={this.setPhotoData} data={this.state.photos} searchTag="bulldogs" currentSearchTag={this.state.currentSearchTag}/>}/>
          <Route exact path="/search/:tag" render={ props => <Gallery {...props} setData={this.setPhotoData} data={this.state.photos}/>}/>
          {/* <Gallery photoData={this.state.photos}/> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
