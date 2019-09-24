import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import Register from './session/signup_form_container';
import Login from './session/login_form_container';
import NavBar from './nav/nav_bar_container';
import MainPage from './main/main_page';

const App = () => (
  <div>
    <NavBar />
    <Switch>
      <AuthRoute exact path = '/register' component={Register} />
      <AuthRoute exact path = '/login' component={Login} />
      <AuthRoute exact path="/" component={MainPage} />
    </Switch>
  </div>
);

export default App;