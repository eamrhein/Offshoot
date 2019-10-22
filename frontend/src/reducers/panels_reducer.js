import {RECEIVE_PANEL, RECEIVE_PANELS, REMOVE_PANELS} from '../actions/panel_actions';
import {LIKE_POST, UNLIKE_POST} from '../actions/user_actions';

const PanelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_PANEL:
      return Object.assign({}, state, {[action.panel.data.id] : action.panel.data });
    case RECEIVE_PANELS:
      return Object.assign({}, state, action.panels.data);
    case REMOVE_PANELS:
      return Object.assign({});
    case LIKE_POST:
      return {
        ...state,
      [action.payload.data.panel.id]: action.payload.data.panel,
      }
    case UNLIKE_POST:
      return {
        ...state,
        [action.payload.data.panel.id]: action.payload.data.panel
      }
    default:
      return state;
  }
};

export default PanelsReducer;
