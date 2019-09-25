import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

export class RouteIndexItem extends Component {
    render() {
        return (
            <li>
                <Link to={`/panels/${this.props.panelId}`} />
            </li>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteIndexItem)
