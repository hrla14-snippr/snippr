
const ChangeSnyppr = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_SNYPPR' :
      return action.payload;
    default :
      return state;
  }
};

export default ChangeSnyppr;
