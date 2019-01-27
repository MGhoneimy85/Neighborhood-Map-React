import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
const mapStyles = {
  width: '100%',
  height: '100%'
};

const API_KEY =  'AIzaSyAxEHaeEZu0J6psDIhMBHEnwJ77jcxQoK0';

class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers:this.props.markers,
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},        //Shows the infoWindow to the selected place upon a marker
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.param = {
      client_id: "1CPFL1RI135SHQNHOTCT2HYAAXV3LK0SHR1RCIBVWOHMLZOF",
      client_secret: "U5G4FEDYVEAHXJH3BSYYGNGPYTK1JKSNQVU3RPWRGHSYN3PV",
      VENUE_ID: '',
      v:'20190126'
    }

    this.apiURL = "https://api.foursquare.com/v2/venues/";
    
  }
  
  getVenueDetails = (id) => {
    axios.get(this.apiURL +this.param.VENUE_ID+'?'+ new URLSearchParams(this.param))
    .then(response => {
      this.setState({
        selectedPlace: response.data.response.venue,
        showingInfoWindow: true
      });
      console.log(response);
      console.log(this.state.selectedPlace);
    })
    .catch(error => {
      console.log("ERROR!! " + error)
    })
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.state);
  }

  onMarkerClick = (props, marker, e) =>{
    console.log(marker);
    let selectedItem = {};
    this.state.markers.forEach((item) => {
      if(item.venue.name.toLowerCase().includes(marker.title.toLowerCase())){
        selectedItem = item;
        this.param.VENUE_ID = item.venue.id;
      }
    });

    this.getVenueDetails(selectedItem.venue.id);

    this.setState({
      activeMarker: marker,
  })
  }
    

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }


  render() {
    return (
        <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{
          lat: this.props.position.lat,
          lng: this.props.position.lng
        }}
      >
       {this.props.markers.map((item,index) => (
          <Marker
                ref={item.venue.id}
                position={{lat: item.venue.location.lat, lng:item.venue.location.lng}}
                key={index}
                title={item.venue.name}
                onClick={this.onMarkerClick}
                name={item.venu}
                animation={this.state.selectedPlace.name === item.venue.name ? this.props.google.maps.Animation.BOUNCE : null  }
                icon= {{url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
              />
       ))}
      
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}

        >
          <div aria-label="title contianer">
            <h4>Title: {this.state.selectedPlace.name}</h4>
            <h4 style={{ color: '#'+ this.state.selectedPlace.ratingColor}}>Rating: {this.state.selectedPlace.rating}</h4>
          </div>
        </InfoWindow>
      </Map>      
    );
  }
}

export default GoogleApiWrapper({
  apiKey:API_KEY
})(MapWrapper)

MapWrapper.propTypes = {
  markers: PropTypes.array.isRequired,
  position:PropTypes.object.isRequired
}
