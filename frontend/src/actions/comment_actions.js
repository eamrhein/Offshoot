import * as commentAPIUTIL from '../util/comment_util';
import {
  receivePanel
} from './panel_actions'

export const createComment = (id, comment) => dispatch => (
  commentAPIUTIL.createComment(id, comment)
    .then((panel) => dispatch(receivePanel(panel)))
    .catch((err) => console.log(err))
)

export const deleteComment = (panelId, commentId) => dispatch => (
  commentAPIUTIL.deleteComment(panelId, commentId)
    .then((panel) => dispatch(receivePanel(panel)))
    .catch((err) => console.log(err))
)