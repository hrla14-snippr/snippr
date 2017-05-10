
exports.CurrentFavorites = (currentFavorites) => {
  console.log(currentFavorites);
  return {
    type: 'CURRENT_FAVORITE',
    payload: currentFavorites,
  };
};