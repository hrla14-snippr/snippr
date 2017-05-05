import React from 'react';
import PropTypes from 'prop-types';
import FavoriteEntry from './FavoriteEntry';

const FavoriteList = (props) => {
  console.log(props, 'in favorites list');
  if (props.favorites.data) {
    return (
      <div className="entryholder">
        {props.favorites.data.map(favorite =>
          <FavoriteEntry favorite={favorite} />)}
      </div>
    );
  }
  return (
    <div />
  );
};

FavoriteList.propTypes = {
  favorites: PropTypes.shape.isRequired,
};

export default FavoriteList;
