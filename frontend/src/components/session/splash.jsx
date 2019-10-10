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

        this.props.login(demoUser).then(() =>{
            this.props.history.push('/');
        });
    }

    render() {

        return (
            <div className="splash-body">
                <h1>Stories with Infinite Possibilites</h1>

                <div className="Splash Buttons">
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Log In</Link>
                    <button onClick={this.logInDemoUser}>Demo App</button>
                </div>
                <div className="blurbs">
                    <h2>Start your own story or branch another</h2>
                    <h2>Vote on your favorite branch</h2>
                    <h2>Scroll through all the variants</h2>
                </div>
            </div>
        );
    }
}

export default Splash;