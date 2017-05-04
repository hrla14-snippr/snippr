import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import GoogleMaps from '../components/GoogleMaps';
import SnypprList from '../components/SnypprList';

const URL = 'http://localhost:3000/nearbySnypprs';
const GMAPURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearbySnypprs: [],
      clientAddress: this.props.profile.address,
      clientConverted: '',
    };
  }

  componentDidMount() {
    console.log('profile in dash', this.props.profile);
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
            this.setState({ clientConverted: results.data.results[0].geometry.location });
          });
      })
      .catch((err) => {
        console.log('error fucked up ', err);
      });
  }
  render() {
    console.log('client dashboards state ', this.state);
    return (
<<<<<<< HEAD
      <div className="dashboard">
        <div className="clientheader">
          <h1 className="clientheadline">Snyppr</h1>
        </div>
        <div className="dashboard-box">
          <div className="navigation">
            <div className="picturebox">
              <img className="userpic" alt="placeholderimage" src="https://timeforgeography.co.uk/static/img/avatar-placeholder.png" height="100" width="100" />
            </div>
            <div className="navmenu">
              <div className="navmenu-items">Profile</div>
              <div className="navmenu-items">Payment</div>
              <div className="navmenu-items">favorites</div>
              <div className="navmenu-items">reviews</div>
              <div onClick={this.props.logout} className="navmenu-items">logout</div>
            </div>
          </div>
          <div className="right-box">
            <GoogleMaps
              clientAddress={this.state.clientConverted}
              snypprs={this.state.nearbySnypprs} google={window.google}
            />
            <SnypprList snypprs={this.state.nearbySnypprs} />
          </div>
          <StripeCheckout
            token={this.onToken}
            stripeKey="pk_test_IhZuZuB7uOy8VF5pg4XA54Df"
            name="Barber"
            description="Cut"
            ComponentClass="div"
            panelLabel="Pay Snyppr"
            amount={1000000}
            currency="USD"
            locale="us"
            email="info@vidhub.co"
          />
        </div>
        <div className="clientfooter" >
          <span className="footerdet">Refer Friends</span>
          <span className="footerdet">About Us</span>
          <span className="footerdet">Become Snyppr</span>
        </div>
=======
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
                <List.Item href="#" onClick={this.props.logout}>
                  <List.Content>
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
>>>>>>> added stripe pay button on client page & initial barber db setup
      </div>
    );
  }
}

ClientDashboard.propTypes = {
  profile: PropTypes.shape.isRequired,
  logout: PropTypes.func.isRequired,
};

export default ClientDashboard;
