import React from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdown: false
        }

        this.handleHamburger = this.handleHamburger.bind(this);

        console.log(this.props)
    }

    handleHamburger() {
        //fix this later so it works with the ui reducer
        this.setState({dropdown: !this.state.dropdown})
    }

    render() {
        return (
        <div className="nav-bar">
            <img className="logo" src="logo512.png"></img>
            <div className={this.state.dropdown ? "dropdown-container open" : "dropdown-container"}>
                <i className="material-icons dropdown-button" onClick={this.handleHamburger}>menu</i>
                <div className="dropdown">
                    <div className="user-links">
                            {this.props.currentUser.isSignedIn ?
                            <div>
                                    <NavLink to={`/users/${this.currentUser.id}`}>
                                    <span className="username">
                                        <img className="acorn-icon" src="acorn-icon-black.png"></img>
                                        <span>{this.props.currentUser.username}</span>
                                    </span>
                                    </NavLink>
                            </div>
                            :
                            <div className="auth-links">
                                <span className="username">Browsing as guest.</span>
                                <div>
                                    <NavLink to="/login">Sign In</NavLink>
                                </div>
                                <div>
                                    <NavLink to="/signup">Sign Up</NavLink>
                                </div>
                            </div>
                            }
                    </div>
                    {this.props.currentUser.isSignedIn ?
                    <div className="story-links">
                        <div>
                            <NavLink to={`/users/${this.currentUser.id}/shoots`}>My Shoots Link</NavLink>
                        </div>
                        <div>
                            <NavLink to={`/roots/new`}>New Story Link</NavLink>
                        </div>
                    </div> :
                    "" }
                    {false ?
                        <div className="auth-links">
                            <div>
                                Sign Out
                            </div> 
                        </div>
                    : 
                    ""}
                </div>
            </div>
        </div>
        )
    }
}

export default NavBar;