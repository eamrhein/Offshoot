import { 
    RECEIVE_CURRENT_MODAL,
    TOGGLE_MODAL,
    CLOSE_MODALS,
    SHOW_INFO_MODAL,
    HIDE_INFO_MODAL
} from "../actions/ui_actions";
import {
    RECEIVE_USER_LOGOUT
} from "../actions/session_actions"
const initialState = {
    currentModal: null,
    showInfoModal: true
}

const uiReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_CURRENT_MODAL:
            newState.currentModal = action.currentModal;
            return newState;
        case TOGGLE_MODAL:
            newState.currentModal === action.modal ? 
                newState.currentModal = null :
                newState.currentModal = action.modal;
            return newState;
        case CLOSE_MODALS:
            newState.currentModal = null;
            return newState;
        case SHOW_INFO_MODAL:
            newState.showInfoModal = true;
            return newState;
        case RECEIVE_USER_LOGOUT:
            newState.showInfoModal = true;
            return newState;
        case HIDE_INFO_MODAL:
            newState.showInfoModal = false;
            return newState;
        default:
            return state;
    }
}

export default uiReducer;