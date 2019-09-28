import { 
    RECEIVE_CURRENT_MODAL,
    TOGGLE_MODAL,
    CLOSE_MODALS
} from "../actions/ui_actions";

const initialState = {
    currentModal: null
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
        default:
            return state;
    }
}

export default uiReducer;