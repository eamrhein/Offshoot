import {
  RECEIVE_USER_PROFILE,
  REMOVE_USER_PROFILE
} from '../actions/profile_actions'

const ProfileReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_USER_PROFILE:
      return Object.assign({}, state, {[action.userProfile.data.id]: action.userProfile.data})
    case REMOVE_USER_PROFILE:
      return Object.assign({});
    default:
      return state;

  }
  
}

export default ProfileReducer;