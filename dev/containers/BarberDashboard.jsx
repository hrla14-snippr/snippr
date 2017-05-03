import React, { Component } from 'react';
import { Menu, Image, Segment} from 'semantic-ui-react';

class BarberDashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <Menu size="medium">
          <Image src='https://d1w2poirtb3as9.cloudfront.net/4d3bab3df8c05d96ddf9.jpeg' size='small' shape='circular' />

          <Menu.Item position='right' name='Hi Jaime'  />
        </Menu>

        

      </div>
    );
  }
}

export default BarberDashboard;
