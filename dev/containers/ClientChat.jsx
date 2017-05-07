import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

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


class ClientChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      messages: [],
      modalIsOpen: false,
      charge: 1000,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onToken = this.onToken.bind(this);
    this.updateCharge = this.updateCharge.bind(this);
  }

  componentDidMount() {
    socket.emit('join', { name: this.props.name });
    socket.on('private-message', (data) => {
      this.setState({
        messages: [data.msg, ...this.state.messages],
      });
    });
    socket.on('payment-request', (data) => {
      this.updateCharge(data.amount);
      this.openModal();
    });
  }
  onToken(token) {
    console.log('token is', { token, stripeId: this.props.snyppr.snypprstripe.id });
    axios.post('/transaction', { token, stripeId: this.props.snyppr.snypprstripe.id, amount: this.state.charge })
      .then((response) => {
        console.log('data is', response);
      });
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

  handleChange(e) {
    this.setState({ term: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    socket.emit('private-message', { name: this.props.name, msg: this.state.term });
    this.setState({ term: '' });
  }

  updateCharge(charge) {
    this.setState({ charge });
  }
  render() {
    return (
      <div onClick={this.closeModal} className="chat-body">
        <h3>Snypee Chat</h3>
        <div className="chat-form-container">
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.term} onChange={this.handleChange} />
          </form>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <StripeCheckout
            token={this.onToken}
            stripeKey="pk_test_IhZuZuB7uOy8VF5pg4XA54Df"
            name={`${this.props.snyppr.fname} ${this.props.snyppr.lname}`}
            description="Snyppr Transaction"
            ComponentClass="div"
            panelLabel="Submit a payment"
            amount={this.state.charge}
            currency="USD"
            locale="us"
            email={this.props.email}
          >
            <button className="stripebutton"> Accept
            </button>
          </StripeCheckout>
          <button className="declinebutton">Decline</button>
        </Modal>
        <div className="chat-display">
          {this.state.messages.map(msg => <p>{msg}</p>)}
        </div>
      </div>
    );
  }
}

ClientChat.propTypes = {
  name: PropTypes.string.isRequired,
  snyppr: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ClientChat;
