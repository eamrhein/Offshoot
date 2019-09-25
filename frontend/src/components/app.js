import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/nav_bar_container';
import Register from './session/signup_form_container';
import Login from './session/login_form_container';
import MainPage from './main/main_page';
import PanelShow from './panel/show/panel_show';
import createPanelContainer from './main/panel/createPanelContainer';
import branchPanelContainer from './main/panel/branchPanelContainer';
import editPanelContainer from './main/panel/editPanelContainer';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>

      <AuthRoute exact path='/signup' component={Register} />
      <AuthRoute exact path='/login' component={Login} />
      <AuthRoute exact path="/" component={MainPage} />
      <Route exact path="/roots/new" component={createPanelContainer} />
      <Route path="/panels/:panelId/branch" component={branchPanelContainer} />
      <Route path="/panels/:panelId/edit" component={editPanelContainer} />
      <Route path="/panels/:panelId" component={PanelShow} />
    </Switch>
  </div>
);

export default App;