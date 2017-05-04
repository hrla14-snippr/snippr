import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Menu, Image, List } from 'semantic-ui-react';
import GoogleMaps from '../components/GoogleMaps';

const URL = 'http://localhost:3000/nearbySnypprs';

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearbySnypprs: [],
      clientAddress: '209 S Mednik Ave, Los Angeles, CA 90022',
    };
  }
  componentDidMount() {
    this.fetchSnypprs(this.state.clientAddress);
  }
  fetchSnypprs(address) {
    console.log('we at least hit hor');
    axios.get(`${URL}/${address}`)
      .then((results) => {
        console.log(results, 'results came back');
        this.setState({ nearbySnypprs: results });
      })
      .catch((err) => {
        console.log('error fucked up ', err);
      });
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
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}><code>
              <Image src="https://d1w2poirtb3as9.cloudfront.net/4d3bab3df8c05d96ddf9.jpeg" size="small" shape="circular" />
              Hi Ebrima
              <List>
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
            </code></Col>
            <Col xs={12} md={8}><code>
              <GoogleMaps google={window.google} />
            </code></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

ClientDashboard.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default ClientDashboard;
