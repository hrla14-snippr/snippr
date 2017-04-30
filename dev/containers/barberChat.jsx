import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// import { connect } from 'react-redux';

// barber component joins room automatically when view is loaded
// this way the user view can grab the corresponding barber email
// when trying to chat and user view will emit a message to that room

class BarberChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      email: 'snypper@io.com',
    };
  }
  componentDidMount() {
    socket.emit('join', { email: 'snypper@io.com' });
  }
  handleChange(e) {
    this.setState({ term: e.target.value });
  }
  handleSubmit() {
    socket.emit('private-message', { email: this.state.email, msg: this.state.term });
    this.setState({ term: '' });
  }
  render() {
    return (
      <form onSubmit={(e) => { e.preventDefault(); this.handleSubmit(this.state.term); }}>
        <input value={this.state.term} onChange={(e) => { this.handleChange(e); }} />
      </form>
    );
  }
}


export default BarberChat;

