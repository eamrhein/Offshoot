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
        
        this.props.login(demoUser);
    }

    render() {

        return (
            <div className="Splash Buttons">
                <Link to="/signup">honk</Link>
                <Link to="/login">bonk?</Link>
                <button onClick={this.logInDemoUser}>Demo App</button>
            </div>
        );
    }
}

export default Splash;