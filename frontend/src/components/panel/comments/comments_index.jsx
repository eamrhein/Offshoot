import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { timeSince } from './timeSince';
import CreateComment from './create_comment';
import { deleteComment } from '../../../actions/comment_actions'



const mSTP = (state, ownProps) => ({
  panel: state.entities.panels[ownProps.match.params.panelId],
  currentUser: state.session.user,
  loggedIn: state.session.isAuthenticated,
})

const CommentsIndex = (props) => {
  let {comments} = props.panel;
  let {currentUser, deleteComment} = props;

  function createDelete(currentUserId, authorId, commentId) {
    if(currentUserId ===  authorId) {
      return(
      <button
        onClick={() => deleteComment(props.panel.id, commentId)}
      >
        Delete
        </button>)
    }
  }

  comments = comments.map((comment) => (
    <div className="comment" key={comment._id}>
      {createDelete(props.currentUser.id, comment.authorId, comment._id)}
      <div>
        <span className="username">{comment.username}</span> <span className="comment-body">{comment.content}</span>
      </div>
      <span className="timestamp">{timeSince(comment.timestamp)} ago</span>
    </div>
  ));
  return (
    <div className="comment-area">
        {comments}
      {!!props.loggedIn ?
      <CreateComment
        authorId={currentUser.id}
      /> :
      ""}
    </div>
  )

}
const mDTP = dispatch => ({
  deleteComment: (panelId, commentId) =>
    dispatch(deleteComment(panelId, commentId))
});
export default withRouter(connect(mSTP, mDTP)(CommentsIndex))