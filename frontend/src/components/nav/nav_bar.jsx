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
                        <div>
                            {this.props.currentUser.isSignedIn ?
                            <NavLink>
                                <span className="username">
                                    <img className="acorn-icon" src="acorn-icon-black.png"></img>
                                    <span>{this.props.currentUser.username}</span>
                                </span>
                            </NavLink>
                            :
                            <span>Browsing as guest</span>
                            }
                        </div>
                        <div>Information Widget</div>
                    </div>
                    <div className="story-links">
                        <div>My Shoots Link</div>
                        <div>New Story Link</div>
                    </div>
                    {true ?
                        <div className="auth-links">
                            <div>
                                Sign Out Link
                            </div> 
                        </div>
                    : 
                        <div className="auth-links">
                            <div>
                                Sign In Link
                            </div>
                            <div>
                                Sign Up Link
                            </div>
                        </div>}
                </div>
            </div>
        </div>
        )
    }
}

export default NavBar;