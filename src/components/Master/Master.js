import React, { Component } from "react";
import  MapWrapper  from '../MapWrapper/MapWrapper.js';
import axios from 'axios';
import logo from '../../logo.svg';

/* this component include header side menu and mapWrapper  */
class Master extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false , 
                   venues: [] , 
                   filteredVenues: [] ,
                   isLoading: false,
                   noResults: false,
                   currentLatLng: {
                      lat: 0,
                      lng: 0
                    }
                  }
    this.param = {
      client_id: "1CPFL1RI135SHQNHOTCT2HYAAXV3LK0SHR1RCIBVWOHMLZOF",
      client_secret: "U5G4FEDYVEAHXJH3BSYYGNGPYTK1JKSNQVU3RPWRGHSYN3PV",
      query: "food",
      ll: this.state.currentLatLng.lat+','+this.state.currentLatLng.lng,
      v:'20190126'
    }

    this.apiURL = "https://api.foursquare.com/v2/venues/explore?";
    this.toggleMenu = this.toggleMenu.bind(this);
    this.filterVenues = this.filterVenues.bind(this);
    
  }
  
  componentDidMount() {
    this.getGeoLocation();
  }

  /*  get all food catgory places near your current location  */
  getVenues = () => {
    console.log(this.param) ; 
    axios.get(this.apiURL + new URLSearchParams(this.param))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items,
          filteredVenues: response.data.response.groups[0].items,
          isLoading: true
        }, null);
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })
  }

  toggleMenu() {
    this.setState(state => ({
      menuOpen: !state.menuOpen
    }));
    console.log(this.state)
  }
  /*  get your current location landitude and langtidue to send them to map Wrapper amd to foursquare */
  getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords);
                this.setState(prevState => ({
                    currentLatLng: {
                        ...prevState.currentLatLng,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }));
                this.param.ll = position.coords.latitude+','+position.coords.longitude
                this.getVenues()
            });
    } else {
        console.log('error');
    }
  }
  filterVenues(e){
    this.setState({
      filteredVenues: []
    }, null);
    let fliteredArray = [];
    this.state.venues.forEach((item) => {
      if(item.venue.name.toLowerCase().includes(e.target.value.toLowerCase())){
        fliteredArray.push(item);
      }
    });
    if(fliteredArray.length === 0){
      this.setState({
        filteredVenues: fliteredArray ,
        noResults: true
      }, null);
    } else{
      this.setState({
        filteredVenues: fliteredArray ,
        noResults: false
      }, null);
    }
  }

  render() {
    
    return (
      <div className="container">
        <div className={this.state.menuOpen? 'side-menu open' : 'side-menu'} >
          <input type="text" onChange={this.filterVenues} placeholder="filter" />
          {this.state.noResults ? <div className="no-results"> No results found </div> : null}
          <div className="side-menu-items">
              {this.state.filteredVenues.map((item,index) => (<div key={index} className="side-menu-item" >{item.venue.name}</div>))}
          </div>
        </div>
        <main className={this.state.menuOpen? 'open' : ''}>
          <header> 
              <div id="nav-icon4" onClick={this.toggleMenu}  className={this.state.menuOpen? 'open' : ''}  >
                <span></span><span></span><span></span>
              </div>
              Neighborhood Map React
          </header>
          <section>
            {
              this.state.isLoading ? 
              <MapWrapper markers={this.state.filteredVenues} position={this.state.currentLatLng} /> 
              : 
              <div className="loading-div">
                  <div className="text">
                    Loading
                  </div>
                  <img src={logo} className="App-logo" alt="logo" />
              </div>
            }
              <img src="http://icons.iconarchive.com/icons/designbolts/vector-foursquare/128/Foursquare-1-icon.png"
					className="foursquarelogo"
				 	alt="foursquarelogo"/>
          </section>
        </main>
      </div>
    );
  }
}

export default Master;
