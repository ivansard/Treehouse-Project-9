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
    //The app state will contain the pug, cats and parrot photos, as well as the any other
    //photo data that will be generated through search
    this.state = { 
      photos: []
    }
    this.setPhotoData = this.setPhotoData.bind(this);
  }


  componentDidMount(){
    console.log(this.props.match);
  }

  setPhotoData(searchTag){

    const url = `https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=${searchTag}&format=json&per_page=24&page=1&nojsoncallback=1`;
    console.log(url);
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
        {/* Giving the Header component the setPhotoData function via props */}
          <Header performSearch={this.setPhotoData}/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/pugs" render={ props => <Gallery {...props} setData={this.setPhotoData} data={this.state.photos} searchTag="pugs"/>}/>
          <Route exact path="/boobs" render={ props => <Gallery {...props} setData={this.setPhotoData} data={this.state.photos} searchTag="cats"/>}/>
          <Route exact path="/bulldogs" render={ props => <Gallery {...props} setData={this.setPhotoData} data={this.state.photos} searchTag="bulldogs"/>}/>
          <Route exact path="/search/:tag" render={ props => <Gallery {...props} setData={this.setPhotoData} data={this.state.photos}/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
