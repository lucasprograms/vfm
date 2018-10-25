import React, { Component } from 'react';
import Key from './Key'
import Header from './Header'
import mapSetup from '../mapSetup'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

class App extends Component {
  getScreenSize () {
    return window.innerHeight + 'px'
  }

  componentDidMount () {
    mapSetup()
  }

  render() {
    return (
      <div className="App">
        <div id="map" style={{ height: this.getScreenSize() }}></div>
        <Header />
        <Key />
      </div>
    );
  }
}

export default App;
