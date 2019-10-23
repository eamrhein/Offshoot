import { combineReducers } from 'redux';
import PanelsReducer from './panels_reducer';
import ProfileReducer from './profile_reducer';
import ChildrenReducer from './children_reducer';
import panelDepthReducer from './panelDepth_reducer'
const EntitiesReducer = combineReducers({
  panels: PanelsReducer,
  userProfiles: ProfileReducer,
  childPanels: ChildrenReducer,
  panelDepth: panelDepthReducer
});


export default EntitiesReducer;
