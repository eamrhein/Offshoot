import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';

import { fetchPanels }  from '../../../../actions/panel_actions'

import BranchIndexItem from './branch_index_item';

export class BranchIndex extends Component {

    componentDidMount() {
        this.props.fetchPanels(this.props.panel.childIds)
    }

    render() {

        return (
            <ul className="branch-index">
                
                { this.props.panel ?
                    this.props.panel.childIds.map((childId) => {
                    return <BranchIndexItem panelId={childId} />
                }) :
                    ""
                }
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

const mapDispatchToProps = (dispatch) => ({
    fetchPanels: (arr) => dispatch(fetchPanels(arr))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BranchIndex));