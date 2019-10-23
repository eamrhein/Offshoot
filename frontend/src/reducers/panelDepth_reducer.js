import {RECEIVE_CHILDREN, CLEAR_CHILDREN} from '../actions/children_actions'

const panelDepthReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CHILDREN:
      return Object.assign({}, state, action.panels.data.rootDesc);
    case CLEAR_CHILDREN:
      return Object.assign({}, state);
    default:
      return state;
  }
}


export default panelDepthReducer;