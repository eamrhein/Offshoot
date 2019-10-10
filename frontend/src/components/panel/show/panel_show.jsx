import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentsIndex from '../comments/comments_index';
import { fetchPanel } from '../../../actions/panel_actions';
import { useSwipeable, Swipeable } from 'react-swipeable';

import Panel from '../panel';
import BranchIndex from './branches/branch_index';

export class PanelShow extends Component {

    constructor(props) {
        super(props);
        this.handleSwipe = this.handleSwipe.bind(this);
    }

    componentDidMount() {
        this.props.fetchPanel(this.props.match.params.panelId);
    }

    handleSwipe() {
        if (this.props.panel.parentId) {
            this.props.fetchPanel(this.props.panel.parentId);
            this.props.history.push(`/panels/${this.props.panel.parentId}`);
        }
    }

    render() {

        if (this.props.panel) {
            return (
            <Swipeable onSwipedRight={this.handleSwipe} className="panel-show">
                    <div className="story-area">
                        <div className="panel-and-buttons">
                        <Panel panelId={this.props.match.params.panelId}/>
                            <div className="desktop-view-buttons">
                                {this.props.panel.parentId ?
                                <i className="material-icons back-button" onClick={this.handleSwipe}>fast_rewind</i>:
                                ""}
                                <i className="material-icons like-button">favorite</i>
                                {this.props.currentUser.id === this.props.panel.authorId ? 
                                <i className="material-icons edit-button">edit</i> : ""}
                            </div>
                        </div>
                        <BranchIndex panelId={this.props.match.params.panelId}/>
                    </div>
                    <div>
                        <CommentsIndex />
                    </div>
            </Swipeable>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }

    }
}

const mapStateToProps = (state, ownProps) => ({
    panel: state.entities.panels[ownProps.match.params.panelId],
    currentUser: state.session.user
})

const mapDispatchToProps = (dispatch) => ({
    fetchPanel: (panelId) => dispatch(fetchPanel(panelId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PanelShow);
