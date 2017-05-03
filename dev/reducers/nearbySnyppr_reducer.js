
const NearbySnypprReducer = (state = [], action) => {
  console.log('we hit the reducer')
  switch (action.type) {
    case 'FETCH_SNYPPRS' :
      return action.payload.data;
    default: return state;
  }
};

export default NearbySnypprReducer;
