import React from 'react';
import PropTypes from 'prop-types';
import SnypprEntry from './SnypprEntry';

const SnypprList = (props) => {
  if (props.snypprs.data) {
    return (
      <div className="entryholder">
        {props.snypprs.data.map(snyppr =>
          <SnypprEntry snyppr={snyppr} />)}
      </div>
    );
  }
  return (
    <div />
  );
};


SnypprList.propTypes = {
  snypprs: PropTypes.shape.isRequired,
};

export default SnypprList;
