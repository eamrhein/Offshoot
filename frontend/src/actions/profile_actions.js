import * as ProfileAPIutil from '../util/profile_util';

export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';
export const REMOVE_USER_PROFILE = 'REMOVE_USER_PROFILE';



const receiveUserProfile = userProfile => ({
  type: RECEIVE_USER_PROFILE,
  userProfile
});

const removeUserProfile = () => ({
  type: REMOVE_USER_PROFILE
})

export const fetchUserProfile = userId => dispatch => (
  ProfileAPIutil.fetchUserProfile(userId)
    .then(userProfile => dispatch(receiveUserProfile(userProfile)))
);

export const clearUserProfileState = () => dispatch => (
  dispatch(removeUserProfile())
)