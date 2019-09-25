import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

import NavBarContainer from './nav/nav_bar_container';1

import Register from './session/signup_form_container';
import Login from './session/login_form_container';
import MainPage from './main/main_page';
import PanelShow from './panel/show/panel_show';
import createPanelContainer from './main/panel/createPanelContainer';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>

      <AuthRoute exact path='/register' component={Register} />
      <AuthRoute exact path='/login' component={Login} />
      <AuthRoute exact path="/" component={MainPage} />
      <Route exact path="/panels/new" component={createPanelContainer} />
      <Route path="/panels/:panelId" component={PanelShow} />
    </Switch>
  </div>
);

export default App;