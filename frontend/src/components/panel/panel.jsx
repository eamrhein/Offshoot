import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';

import { fetchPanel } from '../../actions/panel_actions';
import { toggleModal } from '../../actions/ui_actions';
import {followRoot, unfollowRoot} from '../../actions/user_actions'
export class Panel extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     shareDrawerOpen: false
        // }

        this.handleLike = this.handleLike.bind(this);
        // this.handleShare = this.handleShare.bind(this);
        this.copyLink = this.copyLink.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
        this.renderLikeOnLoad = this.renderLikeOnLoad.bind(this);
        // console.log(this.props);
    }

    componentDidMount() {
       this.props.fetchPanel(this.props.panelId)
      //  .then(() => console.log(this.props.panel));
    }


    handleLike(e) {
        //toggle like
        e.preventDefault();
        if(this.props.session.isAuthenticated){
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
    renderLikeOnLoad(){
        if (this.props.session.isAuthenticated){
            if (this.props.currentUser.followedRoots.includes(this.props.panel.id)) return 'liked'
        }
    }
    // handleShare() {
    //     this.setState({
    //         shareDrawerOpen: !this.state.shareDrawerOpen
    //     });
    //     if (this.shareDrawerOpen) {
    //         this.copyLink();
    //     }
    // }

    copyLink() {
        let link = document.getElementById("panelLink");
        link.select();
        link.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }

    handleTouch() {
        // this.setState({
        //     shareDrawerOpen: false
        // })

        this.props.toggleModal(`active-panel-${this.props.panelId}`);
    }

    render() {

        return (
            <div className={
                this.props.currentModal === `active-panel-${this.props.panelId}` ?
                "panel active" :
                "panel"}>
                <div className="panel-proper">
                    <h1>{`> ${this.props.panel.title}`}</h1>
                    <figure className="panel-figure">
                        {this.props.currentModal === `active-panel-${this.props.panelId}` ?
                        <Link to={`/panels/${this.props.panelId}`}>
                            <img src={this.props.panel.photoURL} className="panel-image" alt={this.props.panel.panelText} onClick={this.handleTouch} />
                        </Link>
                        :
                        <img src={this.props.panel.photoURL} className="panel-image" alt={this.props.panel.panelText} onClick={this.handleTouch} /> }
                        { this.props.currentUser !== undefined ? 
                        <ul className="panel-action-buttons">
                            <i className={`material-icons like-button ${this.renderLikeOnLoad()}`} onClick={this.handleLike} >favorite</i>
                            {/* <i className={this.state.shareDrawerOpen && this.props.currentModal === `active-panel-${this.props.panelId}` ?
                                "material-icons share-button active" :
                                "material-icons share-button"
                            } onClick={this.handleShare}>share</i> */}
                            {/* <Link to={`/panels/${this.props.panelId}`}><i className="material-icons share-button">share</i></Link> */}
                        </ul>
                        : ""}
                    </figure>

                    <figcaption>
                        <Link to={`/users/${this.props.panel.authorId}`}>{`${this.props.panel.authorUsername}`}</Link>
                        <span>{this.props.panel.panelText}</span>
                    </figcaption>
                </div>
                {/* <div className={this.state.shareDrawerOpen && this.props.currentModal === `active-panel-${this.props.panelId}` ?
                    "share-drawer open" :
                    "share-drawer"
                }>
                    <span>Link copied to clipboard.</span>
                    <input type="text" value={`${window.location.href}panels/${this.props.panelId}`} id="panelLink" readOnly></input>
                </div> */}
            </div>
        )
    }
}




const mapStateToProps = (state, ownProps) => {

    let panelId;
    let panel;

    if (ownProps.panel !== undefined) {
        panelId = ownProps.panel.id;
        panel = ownProps.panel;
    } else if (ownProps.panelId !== undefined) {
        panelId = ownProps.panelId;
        panel = state.entities.panels[ownProps.panelId];
    } else {
        panelId = ownProps.match.params.panelId;
        panel = state.entities.panels[ownProps.match.params.panelId];
    };

    return {
        panel: Object.assign({
            id: null,
            authorId: null,
            parentId: null,
            childIds: [],
            title: "...",
            panelText: "text not found",
            photoURL: "panel_not_found.png"
        }, panel),
        // ----- ^^^^^ fix this
        panelId,
        // author: state.entities.users[panel.authorId],
        currentModal: state.ui.currentModal,
        currentUser: state.session.user,
        session: state.session
    };
};

const mapDispatchToProps = (dispatch) => ({
    toggleModal: (modal) => dispatch(toggleModal(modal)),
    fetchPanel: (panelId) => dispatch(fetchPanel(panelId)),
    likePanel: (userAndPanelIds) => dispatch(followRoot(userAndPanelIds)),
    unlikePanel: (userAndPanelIds) => dispatch(unfollowRoot(userAndPanelIds))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Panel));
