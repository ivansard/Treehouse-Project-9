import React, { Component } from 'react';
import './App.css';

//React-router imports
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
//Component imports
import Header from './components/Header';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';
//Api key and axios imports
import apiKey from './config/config';
import axios from 'axios';
import Home from './components/Home';

class App extends Component {

  constructor(){
    super();
    this.state = { 
      currentSearchTag: '',
      photos: [],
      pugPhotos: [],
      catPhotos: [],
      hendrixPhotos: [],
      loading: true
    }
    this.setPhotoData = this.setPhotoData.bind(this);
  }


  //Fetching the three default photo data sets only when the component mounts 
  //for the first time
  componentDidMount(){
    if(this.state.pugPhotos.length === 0){
      this.setPugPhotoData()
    }
    if(this.state.catPhotos.length === 0){
      this.setCatPhotoData()
    }
    if(this.state.hendrixPhotos.length === 0){
      this.setHendrixPhotoData();
    }
  }

  //Function which fetches data based on a search query
  //This will be used for the search path
  setPhotoData(searchTag){
    const url = `https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=${searchTag}&format=json&per_page=24&page=1&nojsoncallback=1`;

    axios.get(url)
    .then(response => {
      //Fetching the photo data
      const photos = response.data.photos.photo;
      //Setting the photos, current search tag and the loading indicator in the state
      this.setState( prevState => {
        return {
          photos: photos,
          currentSearchTag: searchTag,
          loading: false
        }
      })
    })
    .catch(function (error) {
      console.log('Error fetching data from Flickr', error);
    });
  }

  //Fetches default pug data
  setPugPhotoData(){
    const url = `https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=pugs&format=json&per_page=24&page=1&nojsoncallback=1`;

    axios.get(url)
    .then(response => {
      //Fetching the photo data
      const photos = response.data.photos.photo;
      //Setting the photos in the state
      this.setState({
        pugPhotos: photos,
        }
      )
    })
    .catch(function (error) {
      console.log('Error fetching data from Flickr', error);
    });
  }

  //Fetches default cat data
  setCatPhotoData(){
    const url = `https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=cats&format=json&per_page=24&page=1&nojsoncallback=1`;

    axios.get(url)
    .then(response => {
      //Fetching the photo data
      const photos = response.data.photos.photo;
      //Setting the photos in the state
      this.setState({
          catPhotos: photos,
        }
      )
    })
    .catch(function (error) {
      console.log('Error fetching data from Flickr', error);
    });
  }

  //Fetches default hendrix data
  setHendrixPhotoData(){
    const url = `https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=jimi_hendrix&format=json&per_page=24&page=1&nojsoncallback=1`;

    axios.get(url)
    .then(response => {
      //Fetching the photo data
      const photos = response.data.photos.photo;
      //Setting the photos in the state
      this.setState({
        hendrixPhotos: photos,
        }
      )
    })
    .catch(function (error) {
      console.log('Error fetching data from Flickr', error);
    });
  }


  render() {
    return (
      <BrowserRouter>
        <div className="container">
        {/* No matter the route, the Header which contains the Search and Nav bars will always be rendered */}
          <Route path="/" render={props => <Header {...props} setPhotoData={this.setPhotoData}/>}/>
          <Switch>
          {/* The home path */}
            <Route exact path="/" render={props => <Home/>}/>
          {/* Paths for the three default sets of data  */}
            <Route exact path="/pugs" render={ props => <Gallery {...props}  data={this.state.pugPhotos}   />}/>
            <Route exact path="/cats" render={ props => <Gallery {...props}  data={this.state.catPhotos} />}/>
            <Route exact path="/hendrix" render={ props => <Gallery {...props}  data={this.state.hendrixPhotos} />}/>
          {/* The search path  */}
            <Route exact path="/search/:tag" render={ props => <Gallery {...props} setData={this.setPhotoData} data={this.state.photos} currentSearchTag={this.state.currentSearchTag} loading={this.state.loading}/>}/>
          {/* The 404 path, if none of the ones before are matched by the URL  */}
            <Route component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
