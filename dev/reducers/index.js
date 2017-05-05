import { combineReducers } from 'redux';
import AccountTypeReducer from './accounttype_reducer';
import ChangeSnypprReducer from './ChangeSnyppr_reducer';

const rootReducer = combineReducers({
  AccountType: AccountTypeReducer,
  currentSnyppr: ChangeSnypprReducer,
});

export default rootReducer;
