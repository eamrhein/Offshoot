import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';
import EntitiesReducer from './entities_reducer';
const RootReducer = combineReducers({
  entities: EntitiesReducer,
  session,
  errors,
  ui,
});

export default RootReducer;