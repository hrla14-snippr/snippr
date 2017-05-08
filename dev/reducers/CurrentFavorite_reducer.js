
const CurrentFavorites = (state = [], action) => {
  switch (action.type) {
    case 'CURRENT_FAVORITE' :
      return action.payload;
    default :
      return state;
  }
};

export default CurrentFavorites;
