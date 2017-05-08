import React from 'react';
import PropTypes from 'prop-types';
import PortfolioEntry from './PortfolioEntry';

const PortfolioList = props => (
  <div className={`entryholder ${props.hide}`}>
    {props.images.map(image => <PortfolioEntry image={image} />)}
  </div>
);

PortfolioList.propTypes = {
  images: PropTypes.shape.isRequired,
  hide: PropTypes.string.isRequired,
};

export default PortfolioList;
