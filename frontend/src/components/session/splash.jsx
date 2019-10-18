import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {

    constructor(props) {
        super(props);

        this.logInDemoUser = this.logInDemoUser.bind(this);
    }

    logInDemoUser(e) {
        e.preventDefault();

        const demoUser = {
            email: 'demo@demo.com',
            password: '123456'
        }

        this.props.login(demoUser).then(()=> {
            this.props.history.push('/')
        })
    }

    render() {

        return (
            <div className="splash-container">
                <div className="splash-body">
                    <div>
                        <h1>Stories with infinite possibilites.</h1>
                        <h2>Read branching, interactive adventures by the coolest people on the internet.</h2>
                    </div>

                    <div className="blurbs">
                        <img alt="backdrop" src="backdrop.png" className="blurb-backdrop"></img>
                        <div>Start your own story, or branch another</div>
                        <div>Like your favorite branches</div>
                        <div>Discover the newest panels on the front page</div>
                        <div></div>
                    </div>
                    <div className="splash-buttons">
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/login">Log In</Link>
                        <button onClick={this.logInDemoUser}>Demo App</button>
                    </div>
                </div>
                <div className="splash-index">
                    {/* <MainIndexContainer /> */}
                </div>
            </div>
        );
    }
}

export default Splash;