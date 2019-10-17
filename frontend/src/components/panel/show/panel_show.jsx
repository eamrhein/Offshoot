import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentsIndex from '../comments/comments_index';
import { fetchPanel, clearPanelState } from '../../../actions/panel_actions';
import { useSwipeable, Swipeable } from 'react-swipeable';

import { Link } from 'react-router-dom';

import Panel from '../panel';
import BranchIndex from './branches/branch_index';
import LikeButton from '../like_button';

export class PanelShow extends Component {

    constructor(props) {
        super(props);
        this.handleSwipe = this.handleSwipe.bind(this);
    }

    componentDidMount() {
        this.props.fetchPanel(this.props.match.params.panelId);
    }
    componentWillUnmount(){
        this.props.clearPanelState();
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
                        <Panel panelId={this.props.match.params.panelId} type="show"/>
                            <div className="desktop-view-buttons">
                                <div>
                                {this.props.panel.rootId ?
                                    <div className="root-button-container">
                                    <i className="material-icons root-button"><Link to={`/panels/${this.props.panel.rootId}`}>fast_rewind</Link></i>
                                    </div> : ""
                                }
                                {this.props.panel.parentId ?
                                    <div className="back-button-container">
                                        <i className="material-icons back-button">
                                            <Link to={`/panels/${this.props.panel.parentId}`}>skip_previous</Link>
                                        </i>
                                    </div> :
                                ""}
                                </div>
                                <div>
                                <LikeButton panelId={this.props.panel.id} />
                                {this.props.currentUser.id === this.props.panel.authorId ?
                                <div className="edit-button-container">
                                    <i className="material-icons edit-button"><Link to={`${this.props.location.pathname}/edit`}>edit</Link></i>
                                </div>
                                 : ""}
                                </div>
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
    fetchPanel: (panelId) => dispatch(fetchPanel(panelId)),
    clearPanelState: () => dispatch(clearPanelState())
  })

export default connect(mapStateToProps, mapDispatchToProps)(PanelShow);
