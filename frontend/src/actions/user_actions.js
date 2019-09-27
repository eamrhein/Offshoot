import * as APIUTIL from '../util/session_api_util';
import {
  receiveCurrentUser,
} from './session_actions'

export const RECEIVE_FOLLOW_ERRORS = "RECEIVE_FOLLOW_ERRORS";

export const receiveErrors = errors => ({
  type: RECEIVE_FOLLOW_ERRORS,
  errors
})


// These take in the users id and then id of the root panel id

export const followRoot = userAndpanelIds => dispatch => (
  APIUTIL.followRoot(userAndpanelIds)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .catch((err) => dispatch(receiveErrors(err)))
)

export const unfollowRoot = userAndpanelIds => dispatch => (
  APIUTIL.unfollowRoot(userAndpanelIds)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .catch((err) => dispatch(receiveErrors(err)))
)

export const authorRoot = userAndpanelIds => dispatch => (
  APIUTIL.authorRoot(userAndpanelIds)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .catch((err) => dispatch(receiveErrors(err)))
)

export const unauthorRoot = userAndpanelIds => dispatch => (
  APIUTIL.unauthorRoot(userAndpanelIds)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .catch((err) => dispatch(receiveErrors(err)))
)