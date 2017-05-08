import { combineReducers } from 'redux';
import ChangeSnypprReducer from './ChangeSnyppr_reducer';

const rootReducer = combineReducers({
  currentSnyppr: ChangeSnypprReducer,
});

export default rootReducer;
