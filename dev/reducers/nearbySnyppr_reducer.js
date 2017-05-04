
const NearbySnypprReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SNYPPRS' :
      return action.payload.data;
    default: return state;
  }
};

export default NearbySnypprReducer;
