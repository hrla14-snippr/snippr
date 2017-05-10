import React from 'react';
import PropTypes from 'prop-types';

const SnypprReviewsEntry = props => (
  <div className="reviewentry">
    <h1 className="entryheader">{`${props.review.snypee.fname} ${props.review.snypee.lname} gave this Snyppr a ${props.review.rating} star rating`}</h1>
    {/*<span>{`At ${props.review.createdAt}`}</span>*/}
    <p>{`${props.review.description}`}</p>
  </div>
  );

SnypprReviewsEntry.propTypes = {
  review: PropTypes.shape.isRequired,
};

export default SnypprReviewsEntry;
