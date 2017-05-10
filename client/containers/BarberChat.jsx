import React, { Component } from 'react';
import Modal from 'react-modal';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

const socket = io();

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '15%',
    left: '25%',
    border: 'none',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '7px',
    outline: 'none',
    padding: '20px',
    width: '50%',
    height: '300px',
    transition: '1s',
    animation: 'bounce .40s',
  },
};

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
      amount: 0,
      snypee: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.requestPayment = this.requestPayment.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCharge = this.handleCharge.bind(this);
  }

  componentDidMount() {
    socket.emit('join', { name: this.props.name });
    socket.on('private-message', (data) => {
      this.setState({
        messages: [...this.state.messages, data.msg],
      });
    });
    socket.on('snypee-profile', (data) => {
      this.setState({ snypee: data.snypee });
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
    const amount = `${this.state.amount}00`;
    socket.emit('payment-request', { name: this.props.name, amount: parseInt(amount, 10) });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleCharge(event) {
    this.setState({ amount: event.target.value });
  }

  render() {
    return (
      <div className="chat-body">
        <h3 className="text-center">Snyppr Chat</h3>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h1 className="text-center">How much would you like ?</h1>
          <form
            onSubmit={() => {
              this.closeModal();
            }}
          >
            <div className="paymentrequest">
              <label htmlFor="charge">$</label>
              <input onChange={this.handleCharge} type="text" name="charge" />
            </div>
            <input className="subpay" onClick={this.requestPayment} type="submit" />
          </form>
        </Modal>
        <div className="live-chat">
          {this.state.messages.map(msg => <p>{msg}</p>)}
        </div>
        <div className="barber-form-container">
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.term} onChange={this.handleChange} />
          </form>
          <button onClick={this.openModal}>$</button>
        </div>
      </div>
    );
  }
}

BarberChat.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BarberChat;
