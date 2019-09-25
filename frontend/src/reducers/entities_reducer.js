import { combineReducers } from 'redux';
import PanelsReducer from './panels_reducer';

const EntitiesReducer = combineReducers({
  panels: PanelsReducer
});


export default EntitiesReducer;