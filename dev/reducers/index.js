import { combineReducers } from 'redux';
import AccountTypeReducer from './accounttype_reducer';

const rootReducer = combineReducers({
  AccountType: AccountTypeReducer,
});

export default rootReducer;
