import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { timeSince } from './timeSince';
import CreateComment from './create_comment';


const mSTP = (state, ownProps) => ({
  panel: state.entities.panels[ownProps.match.params.panelId]
})


const CommentsIndex = (props) => {
  let { comments } = props.panel;
  let { authorId } = props.panel;
  comments = comments.map((comment) => (
    <div key={comment.id}>
      <div>
        Posted by {comment.username}  {timeSince(comment.timestamp)}  Ago
      </div>
      {comment.content}
    </div>
  ));
  return (
    <div>
        {comments}
      <CreateComment
        authorId={authorId}
      />
    </div>
  )

}

export default withRouter(connect(mSTP)(CommentsIndex))