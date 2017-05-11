import React from 'react';
import PropTypes from 'prop-types';
import SnypprEntry from './SnypprEntry';
import _ from 'underscore';

const SnypprList = (props) => {
  if (props.snypprs.data) {
    const certifiedSnypprs = [];
    _.each(props.snypprs.data, (snyppr) => {
      snyppr.certified === true ? certifiedSnypprs.push(snyppr) : null;
    })
    return (
      <div className="entryholder">
        {certifiedSnypprs.map(snyppr =>
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
