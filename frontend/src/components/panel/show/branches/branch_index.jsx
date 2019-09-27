import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';

import BranchIndexItem from './branch_index_item';

export class BranchIndex extends Component {
    render() {
        return (
            <ul className="branch-index">
                
                {/* { this.props.panel.childIds ?
                    this.props.panel.childIds.map((panelId) => {
                    return <BranchIndexItem panelId={panelId} />
                }) :
                    ""
                } */}
                <li className="new-branch-item">
                    <Link to={`${this.props.match.url}/branch`}>
                        <i className="material-icons">playlist_add</i>
                        <span>Add Branch</span>
                    </Link>
                </li>
            </ul>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    panel: state.entities.panels[ownProps.panelId]
})

const mapDispatchToProps = {
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BranchIndex));