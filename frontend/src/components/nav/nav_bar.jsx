import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import InfoModal from '../infoModal/infoModal';

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.handleHamburger = this.handleHamburger.bind(this);
    }

    handleHamburger() {
        this.props.toggleModal("nav-dropdown");
    }

    render() {
        return (
        <div className="nav-bar">
            <div>   
                    <Link to="/"><img className="logo" src="logo512.png" alt="offshoot logo"></img></Link>

                    <div className="info-modal-container" >
                        {/* <InfoModal  /> */}
                    </div>
                
            </div>

            

            
            <div className={this.props.currentModal === "nav-dropdown" ? "dropdown-container open" : "dropdown-container"}>
                <i className="material-icons dropdown-button" onClick={this.handleHamburger}>menu</i>
                <div className="dropdown">
                    <div className="dropdown-backdrop" onClick={this.handleHamburger}></div>
                    <div className="user-links">
                            {this.props.authStatus ?
                            <div>
                                    <NavLink to={`/users/${this.props.currentUser.id}`}>
                                    <span className="username">
                                        <img className="acorn-icon" src="acorn-icon-black.png" alt="acorn icon"></img>
                                        <span>{this.props.currentUser.username}</span>
                                    </span>
                                    </NavLink>

                            </div>
                            :
                            <div className="auth-links">

                                <span className="guestname">Browsing as guest.</span>
                                <div>
                                    <NavLink to="/login">Sign In</NavLink>
                                </div>
                                <div>
                                    <NavLink to="/signup">Sign Up</NavLink>
                                </div>
                            </div>
                            }
                    </div>
                    {this.props.authStatus ?
                    <div className="story-links">
                        <div>
                            <NavLink to={`/users/${this.props.currentUser.id}`}>My Shoots Link</NavLink>
                        </div>
                        <div>
                            <NavLink to={`/panels/liked`}>Liked Roots</NavLink>
                        </div>
                        <div>
                            <NavLink to={`/roots/new`}>New Story Link</NavLink>
                        </div>
                    </div> :
                    "" }
                    {this.props.authStatus ?
                        <div className="auth-links">
                                <button onClick={this.props.logout}>
                                    Sign Out
                                </button>
                        </div>
                    :
                    ""}
                </div>
              </div>
            </div>
        );
    }
}

export default NavBar;
