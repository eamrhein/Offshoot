import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {createComment} from '../../../actions/comment_actions'


const mSTP = (state, ownProps) => ({
  username: state.session.user.username,
  panelId: ownProps.match.params.panelId,
  panel: state.entities.panels[ownProps.match.params.panelId]
});
const mDTP = (dispatch) => ({
  createComment: (id, comment) => dispatch(createComment(id, comment)),
});

class CreateComment extends React.Component{
  constructor(props){
    super(props);
    this.state={
      comment: {
        content: '',
        authorId: this.props.authorId,
        username: this.props.username
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
      this.setState({
        comment: {
          authorId: this.props.authorId,
          username: this.props.username,
          content: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {createComment, panelId } = this.props;
    createComment(panelId, this.state.comment)
    this.setState({
      comment: {
        content: '',
        authorId: this.props.authorId,
        username: this.props.username
      }
    });
  }

  render(){
    return (
      <div>
        <form onSubmit = {(e) =>this.handleSubmit(e)}>
          <textarea
              value={this.state.comment.content}
              onChange={this.handleChange}
            />
          <button type="submit">Comment</button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(mSTP, mDTP)(CreateComment))