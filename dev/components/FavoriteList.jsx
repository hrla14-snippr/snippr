import React from 'react';
import PropTypes from 'prop-types';
import FavoriteEntry from './FavoriteEntry';

const FavoriteList = (props) => {
  if (props.favorites.data) {
    return (
      <div className="entryholder">
        {props.favorites.data.map(favorite =>
          <FavoriteEntry
            snypeeId={props.snypeeId}
            fetchFavorites={props.fetchFavorites} favorite={favorite}
          />)}
      </div>
    );
  }
  return (
    <div />
  );
};

FavoriteList.propTypes = {
  favorites: PropTypes.shape.isRequired,
  fetchFavorites: PropTypes.shape.isRequired,
};

export default FavoriteList;
