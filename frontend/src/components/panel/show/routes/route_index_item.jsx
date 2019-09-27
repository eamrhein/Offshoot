import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

export class RouteIndexItem extends Component {
    render() {
        return (
            <li>
                <Link to={`/panels/${this.props.panelId}`}>{this.props.panel.title}</Link>
            </li>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    panel: state.entities.panels[ownProps.panelId]
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteIndexItem)
