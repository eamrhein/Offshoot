import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { followRoot, unfollowRoot } from '../../actions/user_actions'

class LikeButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleLike = this.handleLike.bind(this);
        this.renderLikeOnLoad = this.renderLikeOnLoad.bind(this);
    }

    handleLike(e) {
        //toggle like
        e.preventDefault();
        if (this.props.session.isAuthenticated) {
            const { likePanel, unlikePanel, panelId } = this.props;
            let likeElement = e.target
            if (!e.target.classList.contains('liked')) {
                likePanel({ userId: this.props.currentUser.id, rootId: this.props.panelId })
                    .then(() => likeElement.classList.add('liked'))
            } else {
                unlikePanel({ userId: this.props.currentUser.id, rootId: this.props.panelId })
                    .then(() => likeElement.classList.remove('liked'))
            }
        }
    }
    
    renderLikeOnLoad() {
        if (this.props.session.isAuthenticated) {
            if (this.props.currentUser.followedRoots.includes(this.props.panelId)) return 'liked'
        }
    }

    render() {
        return(
            <i className={`material-icons like-button ${this.renderLikeOnLoad()}`} onClick={this.handleLike} >favorite</i>
        )
    }

}


const mapStateToProps = (state, ownProps) => ({
    currentUser: state.session.user,
    session: state.session
});

const mapDispatchToProps = (dispatch) => ({
    likePanel: (userAndPanelIds) => dispatch(followRoot(userAndPanelIds)),
    unlikePanel: (userAndPanelIds) => dispatch(unfollowRoot(userAndPanelIds))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LikeButton));
