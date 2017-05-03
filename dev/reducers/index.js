import { combineReducers } from 'redux';
import NearbyBarberReducer from './nearbybarber_reducer';
import AccountTypeReducer from './accounttype_reducer';

const rootReducer = combineReducers({
  nearbyBarbers: NearbyBarberReducer,
  AccountType: AccountTypeReducer,
});

export default rootReducer;
