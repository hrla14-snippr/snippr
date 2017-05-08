import React from 'react';
import PropTypes from 'prop-types';

const ReviewsEntry = props => (
  <div className="reviewentry">
    <h1>{`${props.review.snyppr.fname} ${props.review.snyppr.lname} gave you a ${props.review.rating} star rating`}</h1>
    <span>{`At ${props.review.createdAt}`}</span>
    <p>{`${props.review.description}`}</p>
  </div>
  );

ReviewsEntry.propTypes = {
  review: PropTypes.shape.isRequired,
};

export default ReviewsEntry;
