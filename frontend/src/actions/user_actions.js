import * as APIUTIL from '../util/session_api_util';


export const RECEIVE_FOLLOW_ERRORS = "RECEIVE_FOLLOW_ERRORS";
export const USER_AUTHORED_UPDATE = 'USER_AUTHORED_UPDATE';
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";


export const receiveErrors = errors => ({
  type: RECEIVE_FOLLOW_ERRORS,
  errors
});

export const userAuthoredUpdate = (currentUser) => ({
  type: USER_AUTHORED_UPDATE,
  currentUser
});

export const likePost = payload => ({
  type: LIKE_POST,
  payload
});

export const unlikePost = payload => ({
  type: UNLIKE_POST,
  payload
});



// These take in the users id and then id of the root panel id

export const like = userAndpanelIds => dispatch => (
  APIUTIL.like(userAndpanelIds)
    .then((payload) => {
      
      console.log(payload)
      dispatch(likePost(payload));
    })
    .catch((err) => dispatch(receiveErrors(err)))
);

export const unlike = userAndpanelIds => dispatch => (
  APIUTIL.unlike(userAndpanelIds)
    .then((payload) => {
      console.log(payload)
      dispatch(likePost(payload));
    })
    .catch((err) => dispatch(receiveErrors(err)))
);

export const authorRoot = userAndpanelIds => dispatch => (
  APIUTIL.authorRoot(userAndpanelIds)
    .then((user) => dispatch(userAuthoredUpdate(user)))
    .catch((err) => dispatch(receiveErrors(err)))
);

export const unauthorRoot = userAndpanelIds => dispatch => (
  APIUTIL.unauthorRoot(userAndpanelIds)
    .then((user) => dispatch(userAuthoredUpdate(user)))
    .catch((err) => dispatch(receiveErrors(err)))
);