import { combineReducers } from 'redux';
import PanelsReducer from './panels_reducer';
import ProfileReducer from './profile_reducer';

const EntitiesReducer = combineReducers({
  panels: PanelsReducer,
  userProfiles: ProfileReducer
});


export default EntitiesReducer;
