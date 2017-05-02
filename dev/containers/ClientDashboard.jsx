import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FetchBarbers } from '../actions/FetchBarbers';
import {Navbar, NavItem, Nav, Grid, Col, Row,ListGroup,ListGroupItem} from 'react-bootstrap'
import {Menu, Dropdown,Image} from 'semantic-ui-react'

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
      <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Snyppr</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem onClick={this.props.logout} href="">Log Out</NavItem>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
      <Grid>
       <Row className="show-grid">
         <Col xs={4} md={2}><code>
         <Image src="https://d1w2poirtb3as9.cloudfront.net/4d3bab3df8c05d96ddf9.jpeg" size='medium' shape='circular'/>
         <p></p>
         Hi Ebrima
         <ListGroup>
           <ListGroupItem href="#link1">Home</ListGroupItem>
           <ListGroupItem href="#link2">Profile</ListGroupItem>
           <ListGroupItem >Payment </ListGroupItem>
            <ListGroupItem onClick={this.props.logout} href="">Log Out </ListGroupItem>
       </ListGroup>
    </code></Col>
         <Col xs={12} md={10}><code>

         <center><h2>Nearby Barbers</h2></center>


         </code></Col>
       </Row>
      </Grid>


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
  nearbyBarbers: PropTypes.Array,
  FetchBarbers: PropTypes.Function,
};

export default connect(mapStateToProps, { FetchBarbers })(ClientDashboard);
