import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// chat containers will be connected to redux store when data is seeded
// import { connect } from 'react-redux';

// for testing purposes since were going to leave email the same as barber chat
// for production we want to extrapolate barber's email an onclick event
// and pass that email in as data so we know what room to join
class ClientChat extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      email: 'snypper@io.com',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    socket.emit('join', { email: this.state.email });
    socket.on('private-message', (data) => {
      console.log(data);
    });
  }
  handleChange(e) {
    this.setState({ term: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    socket.emit('private-message', { email: this.state.email, msg: this.state.term });
    this.setState({ term: '' });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.term} onChange={this.handleChange} />
      </form>
    );
  }
}


// going to need to grab barber's email from state, in order to do
// that ill need to connect this component to the redux store
export default ClientChat;
