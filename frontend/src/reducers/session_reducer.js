import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN
} from '../actions/session_actions';
import {USER_AUTHORED_UPDATE, LIKE_POST, UNLIKE_POST} from '../actions/user_actions';
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true
      }
    case USER_AUTHORED_UPDATE:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser.data,
      }
    case LIKE_POST:
    case UNLIKE_POST:
      return {
        ...state,
        user: action.payload.data.user,
      }
    default:
      return state;
  }
}
