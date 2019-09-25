import { combineReducers } from 'redux';
import panels from './panels_reducer';

const entitiesReducer = combineReducers({
    panels
});

export default entitiesReducer;