import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat : 30.02561 ,
         lng : 31.49550
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAMgEQdLmVso4s7JelAD2tFE8QWmOjpRXM'
})(MapContainer);