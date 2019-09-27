import React, { Component } from 'react'
import { connect } from 'react-redux'

import Panel from '../panel';
import BranchIndex from './branches/branch_index';

export class PanelShow extends Component {
    render() {
        return (
            <div className="panel-show">
                <Panel panelId={this.props.match.params.panelId}/>            
                <BranchIndex panelId={this.props.match.params.panelId}/>
                <div>comment index placeholder</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(PanelShow)
