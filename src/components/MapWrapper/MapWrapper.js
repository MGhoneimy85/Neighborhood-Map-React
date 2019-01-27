import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import React, { Component } from "react";

const mapStyles = {
  width: '100%',
  height: '100%'
};

const API_KEY =  'AIzaSyAxEHaeEZu0J6psDIhMBHEnwJ77jcxQoK0';

class MapWrapper extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  }

  componentDidMount() {
    console.log(this.props);
  }

  

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
  });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
        <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 30.02561,
          lng: 31.49550
        }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Americana Plaza'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>      
    );
  }
}

export default GoogleApiWrapper({
  apiKey:API_KEY
})(MapWrapper)
