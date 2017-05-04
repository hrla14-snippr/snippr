import React, { Component } from 'react';
import { Menu, Image, Segment, List } from 'semantic-ui-react';

class BarberDashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        
        <Menu size="big" className="snyppr-menu" inverted >
          <Menu.Item name="home" />
          <Menu.Item name="messages" />
          <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={this.props.logout} />
          </Menu.Menu>
        </Menu>

        BarberDashboard


        {/*<Image src="https://d1w2poirtb3as9.cloudfront.net/4d3bab3df8c05d96ddf9.jpeg" size="medium" shape="circular" />
         Hi Ebrima*/}

        <List className="snyppr-list" selection verticalAlign="middle">
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
       

      </div>
    );
  }
}

export default BarberDashboard;
