import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

const socket = io();

// import { connect } from 'react-redux';

// barber component joins room automatically when view is loaded
// this way the user view can grab the corresponding barber email
// when trying to chat and user view will emit a message to that room

class BarberChat extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      messages: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.requestPayment = this.requestPayment.bind(this);
  }

  componentDidMount() {
    socket.emit('join', { name: this.props.name });
    socket.on('private-message', (data) => {
      this.setState({
        messages: [...this.state.messages, data.msg],
      });
    });
  }

  handleChange(e) {
    this.setState({ term: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    socket.emit('private-message', { name: this.props.name, msg: this.state.term });
    this.setState({ term: '' });
  }

  requestPayment() {
    socket.emit('payment-request', { name: this.props.name, amount: 1150 });
  }

  render() {
    return (
      <div className="chat-body">
        <h3>Snyppr Chat</h3>

        {this.state.messages.map(msg => <p>{msg}</p>)}
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.term} onChange={this.handleChange} />
        </form>
        <button onClick={this.requestPayment}>$</button>
      </div>
    );
  }
}

BarberChat.propTypes = {
  name: PropTypes.string.isRequired,
};


export default BarberChat;

