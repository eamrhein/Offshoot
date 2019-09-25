import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        this.props.toggleModal(`active-panel-${this.panelId}`);
    }

    render() {
        return (
            <div className={
                this.props.currentModal === `active-panel-${this.panelId}` ?
                "panel active" :
                "panel"}>
                <div className="panel-proper">
                    <h1>Panel Title</h1>
                    <figure className="panel-figure">
                        <img src="testpanel.png" className="panel-image" alt="the draw your squad monopoly exploitable" onClick={this.handleTouch}></img>
                        <ul className="panel-action-buttons">
                            <i className="material-icons like-button">favorite</i>
                            <i className={ this.state.shareDrawerOpen ?
                                "material-icons share-button active" :
                                "material-icons share-button"
                            } onClick={this.handleShare}>share</i>
                        </ul>
                    </figure>
                    <figcaption><span>Your PRANKSTER'S GAMBIT plunges to an all time low. You cannot hope to defeat Egbert in a prank-off. He is simply the best there is.</span></figcaption>
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



const mapStateToProps = (state, ownProps) => ({
    panel: state.entities.panels[ownProps.panelId],
    currentModal: state.ui.currentModal
})

const mapDispatchToProps = (dispatch) => ({
    toggleModal: (modal) => dispatch(toggleModal(modal))
})

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
