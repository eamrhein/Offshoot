import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { timeSince } from './timeSince';
import CreateComment from './create_comment';


const mSTP = (state, ownProps) => ({
  panel: state.entities.panels[ownProps.match.params.panelId],
  loggedIn: state.session.isAuthenticated,
})


const CommentsIndex = (props) => {
  let { comments } = props.panel;
  let { authorId } = props.panel;
  comments = comments.map((comment) => (
    <div className="comment" key={comment.id}>
      <div>
        <span className="username">{comment.username}</span> {comment.content}
      </div>
      <span className="timestamp">Posted {timeSince(comment.timestamp)} Ago</span>
    </div>
  ));
  return (
    <div>
        {comments}
      {!!props.loggedIn ? 
      <CreateComment
        authorId={authorId}
      /> :
      ""}
    </div>
  )

}

export default withRouter(connect(mSTP)(CommentsIndex))