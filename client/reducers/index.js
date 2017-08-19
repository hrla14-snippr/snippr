import { combineReducers } from 'redux';
import ChangeSnypprReducer from './ChangeSnyppr_reducer';
import CurrentFavoriteReducer from './CurrentFavorite_reducer';

const rootReducer = combineReducers({
  currentSnyppr: ChangeSnypprReducer,
  currentFavorites: CurrentFavoriteReducer,
});

export default rootReducer;
