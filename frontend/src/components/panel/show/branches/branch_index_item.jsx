import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

export class BranchIndexItem extends Component {
    render() {
        return (
            <li className="branch-index-item">
                <Link to={`/panels/${this.props.panelId}`}>
                    <img className="panel-thumb" src={this.props.panel.photoUrl}></img>
                    {this.props.panel.title}
                </Link>
            </li>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    panel: state.entities.panels[ownProps.panelId]
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchIndexItem)
