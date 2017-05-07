import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

const socket = io('http://localhost:3000');

// import { connect } from 'react-redux';

// barber component joins room automatically when view is loaded
// this way the user view can grab the corresponding barber email
// when trying to chat and user view will emit a message to that room

class BarberChat extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      messages: [''],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayMessages = this.displayMessages.bind(this);
  }
  componentDidMount() {
    socket.emit('join', { name: this.props.name });
    socket.on('private-message', (data) => {
      console.log(data.msg.msg);
      const newMessage = data.msg.msg;
      const msgArray = this.state.messages;
      msgArray.push(newMessage);

      this.setState({
        messages: msgArray,
      });
    });
  }
  displayMessages() {
    return this.state.messages.map(msg => <p>{msg}</p>);
  }
  handleChange(e) {
    this.setState({ term: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    socket.emit('private-message', { name: this.props.name, msg: this.state.term });
    this.setState({ term: '' });
  }
  render() {
    return (
      <div className="chat-body">
        <h3>Barber Chat</h3>

        {this.displayMessages()}
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.term} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

BarberChat.propTypes = {
  name: PropTypes.string.isRequired,
};


export default BarberChat;

