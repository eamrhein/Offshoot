import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import BranchIndexItem from './branch_index_item';

export class BranchIndex extends Component {
    render() {
        return (
            <ul>
                
                { this.props.panel.childIds ?
                    this.props.panel.childIds.map((panelId) => {
                    return <BranchIndexItem panelId={panelId} />
                }) :
                    ""
                }
                <li>
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

export default connect(mapStateToProps, mapDispatchToProps)(BranchIndex)