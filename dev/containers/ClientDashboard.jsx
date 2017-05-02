import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Image, List } from 'semantic-ui-react';
import { FetchBarbers } from '../actions/FetchBarbers';

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearbyBarbers: this.props.nearbyBarbers,
    };
  }
  componentDidMount() {
    console.log(this.props, 'my props hog');
    this.props.FetchBarbers();
  }
  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name="home" />
          <Menu.Item name="messages" />
          <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={this.props.logout} />
          </Menu.Menu>
        </Menu>
        <Image src="https://d1w2poirtb3as9.cloudfront.net/4d3bab3df8c05d96ddf9.jpeg" size="medium" shape="circular" />
         Hi Ebrima
        <List selection verticalAlign="middle">
          <List.Item>
            <List.Content>
              <List.Header>Home</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Profile</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Payment</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content onClick={this.props.logout}>
              <List.Header>Log Out</List.Header>
            </List.Content>
          </List.Item>
        </List>
              Neary Barbers
        <ul>
          {this.props.nearbyBarbers.map(barber => (
            <div>
              <p>{barber.fname}</p>
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
  nearbyBarbers: PropTypes.arrayOf.isRequired,
  FetchBarbers: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { FetchBarbers })(ClientDashboard);
