import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: props.clientAddress,
    };

    this.setMarkers = this.setMarkers.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }
  componentDidMount() {
    this.loadMap();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ currentLocation: nextProps.clientAddress });
  }
  componentDidUpdate() {
    this.loadMap();
  }
  setMarkers(map) {
    const maps = this.props.google.maps;
    // console.log(this.props.snypprs.data)
    _.each(this.props.snypprs.data, (snyppr) => {
      if (snyppr.certified === true) {
        const marker = new maps.Marker({
          position: { lat: snyppr.lat, lng: snyppr.lng },
          map,
        });
        const contentString = `<div> 
          <h1 class="modalname">${snyppr.fname} ${snyppr.lname}</h1> 
          <div class="imagehold"><image wrapped size="small" class="modalimg" src="http://fuuse.net/wp-content/uploads/2016/02/avatar-placeholder.png" height="65" width="65"/></div>
          <div><h3 class="bodyContent">This is where ratings will go</h3></div></div>`;
        const infoWindow = new maps.InfoWindow({
          content: contentString,
        });
        infoWindow.addListener('click', (e) => {
          console.log(e, 'all the info i need rightchea');
        });
        marker.addListener('click', (e) => {
          console.log(e, 'console log marker add listener');
          infoWindow.open(map, marker);
        });
      }
    });
  }
  loadMap() {
    const homeUrl = 'https://cdn2.iconfinder.com/data/icons/bazza-maps-and-navigation/60/02_-_Home_map_marker-128.png';
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map; // eslint-disable-line react/no-string-refs
      const node = ReactDOM.findDOMNode(mapRef); // eslint-disable-line react/no-find-dom-node
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
    return (
      <div className="gmap" ref="map" /> // eslint-disable-line react/no-string-refs
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
