import React, { Component } from "react";
import  MapWrapper  from '../MapWrapper/MapWrapper.js';


/* this component include header side menu and mapWrapper  */
class Master extends Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  
  toggleMenu() {
    this.setState(state => ({
      menuOpen: !state.menuOpen
    }));
  }

  render() {
    
    return (
      <div className="container">
        <div className={this.state.menuOpen? 'side-menu open' : 'side-menu'} >
            <div>item1</div>
            <div>item2</div>
            <div>item3</div>
            <div>item4</div>
            <div>item5</div>
            <div>item6</div>
        </div>
        <main className={this.state.menuOpen? 'open' : ''}>
          <header> 
              <div id="nav-icon4" onClick={this.toggleMenu}  className={this.state.menuOpen? 'open' : ''}  >
                <span></span>
                <span></span>
                <span></span>
              </div>
              Neighborhood Map React
          </header>
          <section>
              <MapWrapper />
          </section>
        </main>
      </div>
    );
  }
}

export default Master;
