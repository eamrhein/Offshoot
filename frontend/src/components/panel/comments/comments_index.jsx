import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { timeSince } from './timeSince';
import CreateComment from './create_comment';



const mSTP = (state, ownProps) => ({
  panel: state.entities.panels[ownProps.match.params.panelId],
  currentUser: state.session.user
  loggedIn: state.session.isAuthenticated,
})


const CommentsIndex = (props) => {
  let { comments } = props.panel;
  let { authorId } = props.panel;

  function createDelete(currentUser, authorId) {
    debugger
    console.log(currentUser)
    if(currentUser.id ===  authorId) {
      return(<button>Delete</button>)
    }
  }

  comments = comments.map((comment) => (
    <div className="comment" key={comment.id}>
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
        authorId={authorId}
      /> :
      ""}
    </div>
  )

}

export default withRouter(connect(mSTP)(CommentsIndex))