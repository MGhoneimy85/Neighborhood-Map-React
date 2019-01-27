import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import React, { Component } from "react";
import PropTypes from "prop-types";

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
    
  }
  

  componentDidMount() {
    console.log(this.props);
    console.log(this.state);
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
  })

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
        zoom={14}
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
              />
       ))}
      
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

MapWrapper.propTypes = {
  markers: PropTypes.array.isRequired,
  position:PropTypes.object.isRequired
}
