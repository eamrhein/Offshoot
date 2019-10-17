import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';

import LikeButton from './like_button';

import { fetchPanel } from '../../actions/panel_actions';
import { toggleModal } from '../../actions/ui_actions';

export class Panel extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     shareDrawerOpen: false
        // }

        // this.handleShare = this.handleShare.bind(this);
        this.copyLink = this.copyLink.bind(this);
        this.handleTouch = this.handleTouch.bind(this);

        // console.log(this.props);
    }

    componentDidMount() {
       this.props.fetchPanel(this.props.panelId)
      //  .then(() => console.log(this.props.panel));
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
                    {this.props.type === "show" ? <h1>{`${this.props.panel.title}`}</h1> : "" }
                    <figure className="panel-figure">
                        {this.props.currentModal === `active-panel-${this.props.panelId}` ?
                        <Link to={`/panels/${this.props.panelId}`}>
                            <img src={this.props.panel.photoURL} className="panel-image" alt={this.props.panel.panelText} onClick={this.handleTouch} />
                        </Link>
                        :
                        <img src={this.props.panel.photoURL} className="panel-image" alt={this.props.panel.panelText} onClick={this.handleTouch} /> }

                        { this.props.currentUser !== undefined ?
                        <ul className="panel-action-buttons">
                            <LikeButton panelId={this.props.panelId} />
                            {/* <i className={this.state.shareDrawerOpen && this.props.currentModal === `active-panel-${this.props.panelId}` ?
                                "material-icons share-button active" :
                                "material-icons share-button"
                            } onClick={this.handleShare}>share</i> */}
                            {/* <Link to={`/panels/${this.props.panelId}`}><i className="material-icons share-button">share</i></Link> */}
                        </ul>
                        : ""}

                    </figure>

                    <figcaption>
                        {this.props.currentUser !== undefined ?
                            <div className="panel-action-buttons">
                                <LikeButton panelId={this.props.panelId} likes={this.props.panel.likes} />
                                <div className="branch-button-container">
                                    <Link to={`/panels/${this.props.panel.id}`}>
                                        <i className="material-icons branch-button">
                                            call_split
                                        </i>
                                    </Link>
                                    <span>{this.props.panel.childIds.length}</span>
                                </div>
                            </div>
                        : ""}
                        <Link to={`/users/${this.props.panel.authorId}`} className="name">{`${this.props.panel.authorUsername}`}</Link>
                        {this.props.type === "compact" ? <h1>{this.props.panel.title}</h1> : "" }
                        <p>{this.props.panel.panelText}</p>
                    </figcaption>
                </div>
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
            likes: 0,
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
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Panel));
