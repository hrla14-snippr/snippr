import React from 'react';
import PropTypes from 'prop-types';
import TransactionsEntry from './TransactionsEntry';

const TransactionsList = props => (
  <div>
    {props.transactions.map(transaction => <TransactionsEntry transaction={transaction} />)}
  </div>
);

TransactionsList.propTypes = {
  transactions: PropTypes.shape.isRequired,
};

export default TransactionsList;
