import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { like, unlike } from '../../actions/user_actions'

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
            let likeElement = e.target;
            if (!e.target.classList.contains('liked')) {
                likePanel({ userId: this.props.currentUser.id, rootId: this.props.panelId })
                    .then(() => likeElement.classList.add('liked'));
            } else {
                unlikePanel({ userId: this.props.currentUser.id, rootId: this.props.panelId })
                    .then(() => likeElement.classList.remove('liked'));
            }
        }
    }
    
    renderLikeOnLoad() {
        if (this.props.session.isAuthenticated) {
            if (this.props.currentUser.followedRoots.includes(this.props.panelId)) return 'liked';
        }
    }

    render() {
        return(
            <div>{this.props.likes}<i className={`material-icons like-button ${this.renderLikeOnLoad()}`} onClick={this.handleLike} >favorite</i></div>
        )
    }

}


const mapStateToProps = (state, ownProps) => ({
    currentUser: state.session.user,
    session: state.session
});

const mapDispatchToProps = (dispatch) => ({
    likePanel: (userAndPanelIds) => dispatch(like(userAndPanelIds)),
    unlikePanel: (userAndPanelIds) => dispatch(unlike(userAndPanelIds))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LikeButton));
