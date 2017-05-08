import React from 'react';
import PropTypes from 'prop-types';
import PortfolioEntry from './TransactionsEntry';

const PortfolioList = props => (
  <div className="transactionholder">
    {props.images.map(image => <PortfolioEntry image={image} />)}
  </div>
);

PortfolioList.propTypes = {
  images: PropTypes.shape.isRequired,
};

export default PortfolioList;
