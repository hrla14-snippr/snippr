import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FetchBarbers } from '../actions/FetchBarbers';

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearbyBarbers: this.props.nearbyBarbers,
      clientAddress: '209 S Mednik Ave, Los Angeles, CA 90022',
    };
  }
  componentDidMount() {
    console.log(this.props, 'my props hog');
    this.props.FetchBarbers(this.state.clientAddress);
  }
  render() {
    return (
      <div>
        <h1>Client Dashboard</h1>
        <h2>Nearby Barbers</h2>
        <ul>
          {this.props.nearbyBarbers.map(barber => (
            <div>
              <p>{barber.fname}</p>
              <p>{barber.lname}</p>
            </div>
            ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nearbyBarbers: state.nearbyBarbers,
});

ClientDashboard.propTypes = {
  nearbyBarbers: PropTypes.Array,
  FetchBarbers: PropTypes.Function,
};

export default connect(mapStateToProps, { FetchBarbers })(ClientDashboard);

