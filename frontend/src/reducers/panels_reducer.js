import {RECEIVE_PANEL, RECEIVE_PANELS} from '../actions/panel_actions';

const PanelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_PANEL:
      return Object.assign({}, state, {[action.panel.data.id] : action.panel.data })
    case RECEIVE_PANELS:
      return Object.assign({}, state, action.panels.data)
    default: 
      return state;
  }
};

export default PanelsReducer;
