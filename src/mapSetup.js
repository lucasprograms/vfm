import L from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster.js'
import fiberCables from './map_data/maine_fiber_cables.json'
import litBuildings from './map_data/maine_lit_buildings.json'
import { buildBuildingPopupContent, buildFiberPopupContent } from './popupContentFactory'

// begin workaround for icon bug https://github.com/Leaflet/Leaflet/issues/4968
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
// end workaround

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const fiberStyles = (feature) => {
  // console.log([...new Set(fiberCables.features.map(cable => cable.properties.OWNER))]) //<-- find distinct owners of cable
  switch(feature.properties.OWNER) {
    case 'GWI': return { color: 'green' }
    case 'Zayo': return { color: 'red' }
    case 'XO': return { color: 'blue' }
    default: return { color: 'gray' }
  }
}

export default () => {
  let map = L.map('map')
  map._layersMaxZoom = 19 // workaround
  map = map.setView([45.2538, -69.4455], 7)
  map = L.geoJSON(fiberCables, {
    style: fiberStyles,
    onEachFeature: (feature, layer) => {
      layer.bindPopup(buildFiberPopupContent(feature));
    }
  }).addTo(map)

  const points = L.geoJSON(litBuildings, {
    onEachFeature: (feature, layer) => {
      layer.bindPopup(buildBuildingPopupContent(feature));
    }
  })

  let clusters = L.markerClusterGroup({
    maxClusterRadius: 40
  })
  
  clusters.addLayer(points)
  map.addLayer(clusters)
        
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: MAPBOX_TOKEN
  }).addTo(map);
}