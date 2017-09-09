import React, { Component } from 'react';
import Search from './Homepage/Search';
import Image from './Homepage/Image';
import MapSearch from './MapSearch/MapSearch';
import axios from 'axios';


class Home extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.extractSearchCity = this.extractSearchCity.bind(this);
    this.getStartLatLng = this.getStartLatLng.bind(this);

    this.state = {
      searchCity: '',
      secretData: '',
      value: '',
      searchButtonClicked: false
    };
  }

  extractSearchCity(text) {
    let match = "";
    let result = text.match(/\,(.*)\,/);

    if (result) {
      match = result[1].trim();
    };

    console.log(`extracted city: ${match}`);    
    this.setState({ searchCity: match });
  }

  getStartLatLng(address) {
    //URL encode address
    encodeURI(address);
    return new Promise((resolve, reject) => {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`)
      .then((res) => {
        let latLng = res.data.results[0].geometry.location;
        resolve(latLng);
      })
    })
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ value: event.target.value.substring(0, 140) });
  }

  async handleSubmit(event) {
    this.extractSearchCity(this.state.value);
    let latLng = await this.getStartLatLng(this.state.value);
    this.setState({ latLng });
    this.setState({ searchButtonClicked: true })
    
  }

  render () {
    return (
      <div className="img-fluid rounded" alt="Home"> 

        <h1 className="text-center" 
            style={{color:"white",
            fontFamily: "Lobster Two, cursive",
            fontSize: 200}}>Foodies</h1>
        {/* Name of the App- still being decided "Foodies" */}
      {this.state.searchButtonClicked ?  (
        <MapSearch 
          latLng={this.state.latLng}
          searchCity={this.state.searchCity}
        />
      ) : (
        <Search 
          value={this.state.value}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      )}
      <Image />
      </div>
    );
  }
}

export default Home;