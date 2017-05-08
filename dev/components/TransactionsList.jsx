import React from 'react';
import PropTypes from 'prop-types';
import TransactionsEntry from './TransactionsEntry';

const TransactionsList = props => (
  <div className="transactionholder">
    {props.transactions.map(transaction =>
      <TransactionsEntry transaction={transaction} target={props.target} />)}
  </div>
);

TransactionsList.propTypes = {
  transactions: PropTypes.shape.isRequired,
  target: PropTypes.string.isRequired,
};

export default TransactionsList;
