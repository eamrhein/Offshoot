import React, { Component } from 'react'
import { connect } from 'react-redux'

import Panel from '../panel';
import RouteIndex from './routes/route_index';

export class PanelShow extends Component {
    render() {
        console.log("the props are: ", this.props);
        return (
            <div className="panel-show">
                <Panel panelId={this.props.match.params.panelId}/>            
                {/* <RouteIndex panelId={this.props.match.params.panelId}/> */}
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
