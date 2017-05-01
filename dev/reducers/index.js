import { combineReducers } from 'redux';
import NearbyBarberReducer from './nearbybarber_reducer';

const rootReducer = combineReducers({
  nearbyBarbers: NearbyBarberReducer,
});

export default rootReducer;
