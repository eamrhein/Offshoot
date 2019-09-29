import React from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'

const CommentsIndex = (props) => {
  let { comments } = props;
  comments = comments.map((comment) => (
    <div key={comment.id}>
      {comment.body}
    </div>
  ));
  return (
    <div>
      {comments}
    </div>
  )

}

const mDTP = (dispatch) => ({

})

const mSTP = (state, ownProps) => ({
  comments: state.entities.panels[ownProps.match.params.panelId]
})

export default withRouter(connect(mSTP, mDTP)(CommentIndex))