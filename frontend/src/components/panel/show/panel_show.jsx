import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPanel } from '../../../actions/panel_actions';

import Panel from '../panel';
import BranchIndex from './branches/branch_index';

export class PanelShow extends Component {
    componentDidMount() {
        this.props.fetchPanel(this.props.match.params.panelId);
    }

    render() {

        if (this.props.panel) {
            return (
            <div className="panel-show">
                <Panel panelId={this.props.match.params.panelId}/>            
                <BranchIndex panelId={this.props.match.params.panelId}/>
                <div>comment index placeholder</div>
            </div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }

    }
}

const mapStateToProps = (state, ownProps) => ({
    panel: state.entities.panels[ownProps.match.params.panelId]
})

const mapDispatchToProps = (dispatch) => ({
    fetchPanel: (panelId) => dispatch(fetchPanel(panelId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PanelShow);
