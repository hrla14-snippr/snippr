import React from 'react';
import PropTypes from 'prop-types';

const PortfolioEntry = (props) => {
  console.log('we are in portfolio entries!!');
  return (
    <div className="imghold">
      <img className="portimg" alt="thumbnail" src={`${props.image}`} />
    </div>
  );
};


PortfolioEntry.propTypes = {
  image: PropTypes.string.isRequired,
}

export default PortfolioEntry;
