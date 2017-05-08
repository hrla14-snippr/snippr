import React from 'react';
import PropTypes from 'prop-types';

const ReviewsEntry = props => (
  <div className="reviewentry">
    <h1>{`${props.review[props.reviewer].fname} ${props.review[props.reviewer].lname} gave you a ${props.review.rating} star rating`}</h1>
    <span>{`At ${props.review.createdAt}`}</span>
    <p>{`${props.review.description}`}</p>
  </div>
  );

ReviewsEntry.propTypes = {
  review: PropTypes.shape.isRequired,
  reviewer: PropTypes.string.isRequired,
};

export default ReviewsEntry;
