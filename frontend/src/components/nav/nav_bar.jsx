import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {



    render() {
        <div className="nav-bar">
            <img className="logo"></img>
            <div className="dropdown-container">
                <i className="material-icons dropdown-button">menu</i>
                <div className="dropdown-list">
                    <div className="user-links">
                        <div>Profile Link</div>
                        <div>Information Widget</div>
                    </div>
                    <div className="story-links">
                        <div>New Story Link</div>
                        <div>My Stories Link</div>
                    </div>
                    {currentUser ? 
                        <div className="auth-links">
                            <div>
                                sign out link
                            </div> 
                        </div>
                    : 
                        <div className="auth-links">
                            <div>
                                sign in link
                            </div>
                            <div>
                                sign up link
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    }
}

export default NavBar;