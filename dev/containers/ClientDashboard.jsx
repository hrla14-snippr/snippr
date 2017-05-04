import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { Grid, Row, Col } from 'react-bootstrap';
import { Menu, Image, List } from 'semantic-ui-react';
import GoogleMaps from '../components/GoogleMaps';

const URL = 'http://localhost:3000/nearbySnypprs';
const GMAPURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearbySnypprs: [],
      clientAddress: '209 S Mednik Ave, Los Angeles, CA 90022',
      clientConverted: '',
    };
  }
  componentDidMount() {
    this.fetchSnypprs(this.state.clientAddress);
  }
  onToken(token) {
    console.log('token is', { token, snyppr: 'acct_1AFZLMC3YHU2IY7a' });
    axios.post('/transaction', { token, snyppr: 'acct_1AFZLMC3YHU2IY7a' })
     .then((response) => {
       console.log('data is', response);
       alert('We are in business');
     });
  }
  fetchSnypprs(address) {
    axios.get(`${URL}/${address}`)
      .then((results) => {
        this.setState({ nearbySnypprs: results });
      })
      .then(() => {
        axios.get(`${GMAPURL}${this.state.clientAddress}`)
          .then((results) => {
            console.log(results.data.results[0].geometry.location, 'hi hi hi hi ');
            this.setState({ clientConverted: results.data.results[0].geometry.location });
          });
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
              <GoogleMaps
                clientAddress={this.state.clientConverted}
                snypprs={this.state.nearbySnypprs} google={window.google}
              />
              <StripeCheckout
                token={this.onToken}
                stripeKey="pk_test_IhZuZuB7uOy8VF5pg4XA54Df"
                name="Three Comma Co."
                description="Big Data Stuff"
                image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
                ComponentClass="div"
                panelLabel="Give Money"
                amount={1000000}
                currency="USD"
                locale="us"
                email="info@vidhub.co"
              />
            </code></Col>
          </Row>
        </Grid>
        <div className="snyp-footer" />
      </div>
    );
  }
}

ClientDashboard.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default ClientDashboard;
