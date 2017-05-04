import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: null,
        lng: null,
      },
    };

    this.setMarkers = this.setMarkers.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }
  componentDidMount() {
    this.loadMap();
  }
  componentDidUpdate() {
    this.loadMap();
  }
  setMarkers(map) {
    console.log(this.props, 'inside of set markers');
    const maps = this.props.google.maps;
    _.each(this.props.barbers, (barber) => {
      const marker = new maps.Marker({
        position: { lat: barber[1], lng: barber[2] },
        map,
      });
      const cardContent = `<div class='card-content'>
      <img src='https://d1w2poirtb3as9.cloudfront.net/4d3bab3df8c05d96ddf9.jpeg'>
      <div>${barber[0]}.fname ${barber[0].lname}</div>
      </div>`;
      const infoWindow = new maps.InfoWindow({
        cardContent,
      });
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  }
  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const { initialCenter, zoom } = this.props;
      const { lat, lng } =
        !this.state.currentLocation.lat || !this.state.currentLocation.lng ?
          initialCenter : this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center,
        zoom,
      });
      this.map = new maps.Map(node, mapConfig);
      const home = new maps.Marker({
        map: this.map,
        position: center,
      });
      home.setMap(this.map);
      this.setMarkers(this.map);
    }
  }
  render() {
    console.log('these are the barbs inside of maps comp', this.props);
    return (
      <div className="googlemap" ref="map" />
    );
  }
}

const mapStateToProps = state => (
  { barbers: state.nearbyBarbers }
);

GoogleMaps.propTypes = {
  google: PropTypes.shape.isRequired,
  barbers: PropTypes.arrayOf.isRequired,
  zoom: PropTypes.shape.isRequired,
  initialCenter: PropTypes.number.isRequired,
};

GoogleMaps.defaultProps = {
  zoom: 10,
  initialCenter: {
    lat: 34.049963,
    lng: -118.300709,
  },
};

export default connect(mapStateToProps)(GoogleMaps);
