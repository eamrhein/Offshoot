import React, { Component } from 'react'
import { connect } from 'react-redux'

import Panel from '../panel';

export class PanelShow extends Component {
    render() {
        return (
            <div>
                <Panel panelId={this.props.match.params.panelId}/>
                <div>route index placeholder</div>
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
