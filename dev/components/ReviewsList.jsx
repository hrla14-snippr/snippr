import React from 'react';
import PropTypes from 'prop-types';
import ReviewEntry from './ReviewsEntry';

const ReviewsList = props => (
  <div>
    {props.reviews.map(review => <ReviewEntry review={review} />)}
  </div>
);

ReviewsList.propTypes = {
  reviews: PropTypes.shape.isRequired,
};

export default ReviewsList;
