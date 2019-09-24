import { combineReducers } from 'redux';
import session from './session_reducer';
import ui from './ui_reducer';

const RootReducer = combineReducers({
  session,
  ui
});

export default RootReducer;