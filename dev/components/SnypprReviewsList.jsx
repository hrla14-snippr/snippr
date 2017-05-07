import React from 'react';
import PropTypes from 'prop-types';
import SnypprReviewsEntry from './SnypprReviewsEntry';

const SnypprReviewsList = props => (
  <div>
    {props.reviews.map(review => <SnypprReviewsEntry review={review} />)}
  </div>
);

SnypprReviewsList.propTypes = {
  reviews: PropTypes.shape.isRequired,
};

export default SnypprReviewsList;
