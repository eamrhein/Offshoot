import { combineReducers } from 'redux';
import PanelsReducer from './panels_reducer';
import ProfileReducer from './profile_reducer';
import ChildrenReducer from './children_reducer';

const EntitiesReducer = combineReducers({
  panels: PanelsReducer,
  userProfiles: ProfileReducer,
  childPanels: ChildrenReducer
});


export default EntitiesReducer;
