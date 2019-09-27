import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { fetchPanel } from '../../actions/panel_actions';
import { toggleModal } from '../../actions/ui_actions';

export class Panel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shareDrawerOpen: false
        }

        this.handleLike = this.handleLike.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.copyLink = this.copyLink.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
    }

    componentDidMount() {
        this.props.fetchPanel(this.props.panelId);
    }

    handleLike() {
        //toggle like
    }

    handleShare() {
        this.setState({
            shareDrawerOpen: !this.state.shareDrawerOpen
        });
        if (this.shareDrawerOpen) {
            this.copyLink();
        }
    }

    copyLink() {
        let link = document.getElementById("panelLink");
        link.select();
        link.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }

    handleTouch() {
        this.props.toggleModal(`active-panel-${this.props.panelId}`);
    }

    render() {
        console.log(this.props);
        return (
            <div className={
                this.props.currentModal === `active-panel-${this.props.panelId}` ?
                "panel active" :
                "panel"}>
                <div className="panel-proper">
                    <h1>{`> ${this.props.panel.title}`}</h1>
                    <figure className="panel-figure">
                        <img src={this.props.panel.photoURL} className="panel-image" alt={this.props.panel.panelText} onClick={this.handleTouch}></img>
                        <ul className="panel-action-buttons">
                            <i className="material-icons like-button">favorite</i>
                            <i className={ this.state.shareDrawerOpen ?
                                "material-icons share-button active" :
                                "material-icons share-button"
                            } onClick={this.handleShare}>share</i>
                        </ul>
                    </figure>
                    <figcaption><span>{this.props.panel.panelText}</span></figcaption>
                </div>
                <div className={ this.state.shareDrawerOpen ?
                    "share-drawer open" :
                    "share-drawer"
                }>
                    <span>Link copied to clipboard.</span>
                    <input type="text" value={`${this.props.url}/panels/${this.props.panelId}`} id="panelLink"></input>
                </div>
            </div>
        )
    }
}




const mapStateToProps = (state, ownProps) => {

    console.log(state);
    console.log(ownProps);

    let panel = state.entities.panels[ownProps.match.params.panelId];
    
    return {
        panel: Object.assign({
            id: null,
            authorId: null,
            parentId: null,
            childIds: null,
            title: "...",
            panelText: "text not found",
            photoUrl: "panel_not_found.png"
        }, panel),
        // ----- ^^^^^ fix this
        panelId: ownProps.match.params.panelId,
        // author: state.entities.users[panel.authorId],
        currentModal: state.ui.currentModal,
    };
};

const mapDispatchToProps = (dispatch) => ({
    toggleModal: (modal) => dispatch(toggleModal(modal)),
    fetchPanel: (panelId) => dispatch(fetchPanel(panelId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Panel));
