import React from 'react';
import PropTypes from 'prop-types';
import ReviewEntry from './ReviewsEntry';

const ReviewsList = props => (
  <div className="transactionholder">
    {props.reviews.map(review => <ReviewEntry review={review} reviewer={props.reviewer} />)}
  </div>
);

ReviewsList.propTypes = {
  reviews: PropTypes.shape.isRequired,
  reviewer: PropTypes.string.isRequired,
};

export default ReviewsList;
