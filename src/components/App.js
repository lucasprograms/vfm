import React, { Component } from 'react';
import Key from './Key'
import Header from './Header'
import MapTypeSelector from './MapTypeSelector'
import mapSetup from '../mapSetup'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mapType: 'street',
      map: null,
      streetTiles: null,
      satelliteTiles: null
    }
  }
  
  getScreenSize () {
    return window.innerHeight + 'px'
  }

  componentDidMount () {
    const { map, streetTiles, satelliteTiles } = mapSetup(this.state.mapType)

    this.setState({
      map,
      streetTiles,
      satelliteTiles
    })
  }

  updateMapType (mapType) {
    this.setState({
      mapType
    })

    const { map, streetTiles, satelliteTiles } = this.state

    map.removeLayer(mapType === 'street' ? satelliteTiles : streetTiles)
    map.addLayer(mapType === 'street' ? streetTiles : satelliteTiles)
  }

  render() {
    return (
      <div className="App">
        <div id="map" style={{ height: this.getScreenSize() }}></div>
        <Header />
        <Key />
        <MapTypeSelector updateMapType={this.updateMapType.bind(this)} currentMapType={this.state.mapType} />
      </div>
    );
  }
}

export default App;
