import React, { Component } from 'react'

export default class MapTypeSelector extends Component {
  handleChange (e) {
    this.props.updateMapType(e.target.value)
  }

  render() {
    return (
      <form className="map-type-selector">
        <div className="map-type-selector__title">Map Type:</div>
        <div className="map-type-selector__option">
          <input type="radio" checked={this.props.currentMapType === 'satellite'} onChange={this.handleChange.bind(this)} value="satellite"/>
          Satellite
        </div>
        <div className="map-type-selector__option">
          <input type="radio" checked={this.props.currentMapType === 'street'} onChange={this.handleChange.bind(this)} value="street"/>
          Street
        </div>
      </form>
    )
  }
}

