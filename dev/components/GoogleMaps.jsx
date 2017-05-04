import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: props.clientAddress.lat,
        lng: props.clientAddress.lat,
      },
    };

    this.setMarkers = this.setMarkers.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }
  componentDidMount() {
    this.loadMap();
  }
  componentWillReceiveProps() {
    console.log('hhahaha');
    this.setState({ currentLocation: this.props.clientAddress });
  }
  componentDidUpdate() {
    this.loadMap();
  }
  setMarkers(map) {
    const maps = this.props.google.maps;
    _.each(this.props.snypprs.data, (snyppr) => {
      const marker = new maps.Marker({
        position: { lat: snyppr[1], lng: snyppr[2] },
        map,
      });
      const contentString = `<div onclick=console.log('hi') data-*=JSON.parse(${snyppr[0]}) id="content">  <div id="siteNotice">  </div> 
        <h1 id="firstHeading" class="firstHeading">${snyppr[0].fname}</h1> 
        <image wrapped size="small" src="http://fuuse.net/wp-content/uploads/2016/02/avatar-placeholder.png" height="85" width="85"/>' 
        <div id="bodyContent">  <h2>${snyppr[0].lname}</h2>  </div>`;
      const infoWindow = new maps.InfoWindow({
        content: contentString,
      });
      marker.addListener('click', (e) => {
        console.log(e, 'console log marker add listener');
        infoWindow.open(map, marker);
      });
      infoWindow.addListener('click', (e) => {
        console.log(e, 'all the info i need rightchea');
      });
    });
  }
  loadMap() {
    console.log('we in chea for the fifth time in fuckin loadmap');
    const homeUrl = 'https://cdn2.iconfinder.com/data/icons/bazza-maps-and-navigation/60/02_-_Home_map_marker-128.png';
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const { initialCenter, zoom } = this.props;
      console.log(this.state.currentLocation.lat, 'this is currentlat boy', 'this is current long too ', this.state.currentLocation.lng);
      const { lat, lng } =
        !this.state.currentLocation.lat || !this.state.currentLocation.lng ?
          initialCenter : this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center,
        zoom,
      });
      this.map = new maps.Map(node, mapConfig);
      const home = {
        url: homeUrl,
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 20),
      };
      const homeMarker = new maps.Marker({
        map: this.map,
        draggable: false,
        animation: maps.Animation.DROP,
        position: center,
        icon: home,
        title: 'Your Location',
      });
      homeMarker.setMap(this.map);
      this.setMarkers(this.map);
    }
  }
  render() {
    console.log('in google maps ', this.props.clientAddress.lat);
    return (
      <div className="googlemap" ref="map" />
    );
  }
}

GoogleMaps.propTypes = {
  google: PropTypes.shape.isRequired,
  snypprs: PropTypes.arrayOf.isRequired,
  zoom: PropTypes.shape.isRequired,
  initialCenter: PropTypes.number.isRequired,
  clientAddress: PropTypes.shape.isRequired,
};

GoogleMaps.defaultProps = {
  zoom: 11,
  initialCenter: {
    lat: 34.049963,
    lng: -118.300709,
  },
};

export default GoogleMaps;
