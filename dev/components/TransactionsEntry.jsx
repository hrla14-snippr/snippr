import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal';

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

class TransactionsEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      rating: 3,
      desc: '',
    };
    this.closeModal = this.closeModal.bind(this);
    this.openReviewModal = this.openReviewModal.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.updateDesc = this.updateDesc.bind(this);
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  openReviewModal() {
    this.setState({ modalIsOpen: true });
  }

  updateRating(e) {
    console.log(e.target.value);
    this.setState({ rating: e.target.value });
  }

  updateDesc(e) {
    console.log(e.target.value);
    this.setState({ desc: e.target.value });
  }

  submitReview(e) {
    e.preventDefault();
    console.log('submitting');
    axios.post('/reviews', {
      description: this.state.desc,
      rating: this.state.rating,
      transactionId: this.props.transaction.id,
      model: `${this.props.target}Review`,
      snypprId: this.props.transaction.snypprId,
      snypeeId: this.props.transaction.snypeeId,
    })
      .then(() => console.log('successful'))
      .catch(err => console.log('review err', err));
  }

  // req.body.description, snypprId, snypeeId, rating
  // transactionId, model: SnypprReview or SnypeeReview
  render() {
    const review = this.props.transaction[`${this.props.target.toLowerCase()}review`];
    return (
      <div className="reviewentry">
        <h1>{`Snypped with ${this.props.transaction[this.props.target.toLowerCase()].fname} ${this.props.transaction[this.props.target.toLowerCase()].lname}`}</h1>
        <p>{`For $${this.props.transaction.price.toFixed(2)}`}</p>
        {
          (review)
          ? <div>
            <p>{`You've given this ${this.props.target} a rating of ${review.rating} for this transaction`}</p>
            <p>{`"${review.description}"`}</p>
          </div>
          : <div>
            <p>{'You haven\'t reviewed this transaction yet.'}</p>
            <button onClick={this.openReviewModal}>Review this transaction</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Modal"
            >
              <form onSubmit={this.submitReview}>
                <input type="text" name="description" onChange={this.updateDesc} required />
                <select name="rating" onChange={this.updateRating} required>
                  <option default disabled selected>Select a value</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <input type="submit" value="Submit" />
              </form>
            </Modal>
          </div>
        }
      </div>
    );
  }
}

TransactionsEntry.propTypes = {
  transaction: PropTypes.shape.isRequired,
  target: PropTypes.string.isRequired,
};

export default TransactionsEntry;
