import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';


class MapWrapper extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      markers:this.props.markers,
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: this.props.selected,        //Shows the infoWindow to the selected place upon a marker
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    // foursquare variables
    this.param = {
      client_id: "1CPFL1RI135SHQNHOTCT2HYAAXV3LK0SHR1RCIBVWOHMLZOF",
      client_secret: "U5G4FEDYVEAHXJH3BSYYGNGPYTK1JKSNQVU3RPWRGHSYN3PV",
      v:'20190126'
    }
    this.apiURL = "https://api.foursquare.com/v2/venues/";

    //map variables
    this.mapStyles = {
      width: '100%',
      height: '100%'
    };
  }

  // get place details rating to show it in info window
  getVenueDetails = (id) => {
    axios.get(this.apiURL + id +'?'+ new URLSearchParams(this.param))
    .then(response => {
      this.setState({
        selectedPlace: response.data.response.venue
      });
    })
    .catch(error => {
      alert('ERROR!! from foursquare Qota Exceeded '+ error);
      console.log("ERROR!! " + error)
    })
  }


  onMarkerClick = (props, marker , e) =>{
    let selectedItem = {};
    this.state.markers.forEach((item) => {
      if(item.venue.name.toLowerCase().includes(marker.title.toLowerCase())){
        selectedItem = item;
      }
    });
    //get selected marker venue details rating to display it in info window
    this.getVenueDetails(selectedItem.venue.id);
    // set selected marker selected venue show info window
    this.setState({
      activeMarker: marker,
      selectedPlace:selectedItem.venue,
      showingInfoWindow: true
    })
  }
    

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: {},
        showingInfoWindow: false
      });
    }
  }


  render() {
    return (
        <Map
        google={this.props.google}
        zoom={13}
        style={this.mapStyles}
        centerAroundCurrentLocation={true}
        onClick={this.onClose}
        initialCenter={{
          lat: this.props.position.lat,
          lng: this.props.position.lng
        }}
      >
       {this.props.markers.map((item,index) => (
          <Marker
                id={item.venue.id}
                position={{lat: item.venue.location.lat, lng:item.venue.location.lng}}
                key={index}
                title={item.venue.name}
                onClick={this.onMarkerClick}
                name={item.venue.name}
                animation={this.state.activeMarker.name === item.venue.name ? this.props.google.maps.Animation.BOUNCE : null  }
                icon= { this.state.activeMarker.name === item.venue.name ? {url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"} : ''}
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
  apiKey:  'AIzaSyAxEHaeEZu0J6psDIhMBHEnwJ77jcxQoK0'
})(MapWrapper)

MapWrapper.propTypes = {
  markers: PropTypes.array.isRequired,
  position:PropTypes.object.isRequired,
  selected:PropTypes.object.isRequired
}
