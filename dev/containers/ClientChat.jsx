import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

const socket = io();

// chat containers will be connected to redux store when data is seeded
// import { connect } from 'react-redux';

// for testing purposes since were going to leave email the same as barber chat
// for production we want to extrapolate barber's email an onclick event
// and pass that email in as data so we know what room to join
class ClientChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      messages: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    socket.emit('join', { name: this.props.name });
    socket.on('private-message', (data) => {
      this.setState({
        messages: [...this.state.messages, data.msg],
      });
    });
    socket.on('payment-request', (data) => {
      this.props.updateCharge(data.amount);
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

  render() {
    return (
      <div className="chat-body">
        <h3>Snypee Chat</h3>

        {this.state.messages.map(msg => <p>{msg}</p>)}
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.term} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

ClientChat.propTypes = {
  name: PropTypes.string.isRequired,
  updateCharge: PropTypes.func.isRequired,
};
// going to need to grab barber's email from state, in order to do
// that ill need to connect this component to the redux store
export default ClientChat;
