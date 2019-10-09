import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

export class BranchIndexItem extends Component {
    render() {
        // console.log(this.props)
        return (
            <li className="branch-index-item">
                {this.props.panel ?
                <Link to={`/panels/${this.props.panelId}`}>
                    <div className="thumb-holder">
                        <img
                         className="panel-thumb"
                         src={this.props.panel.photoURL}
                         alt={this.props.panel.title}
                    />
                    </div>
                    {this.props.panel.title}
                </Link>
                :
                "" }
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
