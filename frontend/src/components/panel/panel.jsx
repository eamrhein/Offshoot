import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';

import { fetchPanel } from '../../actions/panel_actions';
import { toggleModal } from '../../actions/ui_actions';

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

        console.log(this.props);
    }

    componentDidMount() {
       this.props.fetchPanel(this.props.panelId);
    }


    handleLike() {
        //toggle like
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
                        <ul className="panel-action-buttons">
                            <i className="material-icons like-button">favorite</i>
                            {/* <i className={this.state.shareDrawerOpen && this.props.currentModal === `active-panel-${this.props.panelId}` ?
                                "material-icons share-button active" :
                                "material-icons share-button"
                            } onClick={this.handleShare}>share</i> */}
                            <Link to={`/panels/${this.props.panelId}`}><i className="material-icons share-button">share</i></Link>
                        </ul>
                    </figure>
                    <figcaption><span>{this.props.panel.panelText}</span></figcaption>
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
    console.log(ownProps);

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

    console.log(panel);
    
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
    };
};

const mapDispatchToProps = (dispatch) => ({
    toggleModal: (modal) => dispatch(toggleModal(modal)),
    fetchPanel: (panelId) => dispatch(fetchPanel(panelId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Panel));
