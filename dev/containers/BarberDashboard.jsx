import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Image, List } from 'semantic-ui-react';

class BarberDashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <nav className="snyppr-menu" />
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}><code>
              <Image className="snyppr-img" src="https://d1w2poirtb3as9.cloudfront.net/4d3bab3df8c05d96ddf9.jpeg" size="small" shape="circular" />
              <List size="small" selection verticalAlign="middle">

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
                  <List.Content>
                    <List.Header>Log Out</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </code></Col>
          </Row>
          <img alt="chat-svg" className="chat-svg" src="/public/assets/speech-bubble.svg" />
        </Grid>
        <div className="snyppr-footer" />
      </div>
    );
  }
}

export default BarberDashboard;
