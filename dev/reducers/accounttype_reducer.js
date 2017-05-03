
const AccountTypeReducer = (state = 'snyppr', action) => {
  switch (action.type) {
    case 'SET_ACCOUNT_TYPE':
      return action.payload;
    default:
      return state;
  }
};

export default AccountTypeReducer;
