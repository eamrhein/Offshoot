import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {



    render() {
        return (
        <div className="nav-bar">
            <img className="logo" src="logo512.png"></img>
            <div className="dropdown-container">
                <i className="material-icons dropdown-button">menu</i>
                <div className="dropdown">
                    <div className="user-links">
                        <div>Profile Link</div>
                        <div>Information Widget</div>
                    </div>
                    <div className="story-links">
                        <div>My Shoots Link</div>
                        <div>New Story Link</div>
                    </div>
                    {/* { currentUser true */}
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