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
import LikedIndexContainer from './main/index/liked_index_container';
import MainIndexContainer from './main/index/main_Index_container';
import AuthoredIndexContainer from './main/index/authored_index_container';

const App = () => (
  <div>
    <NavBarContainer />
    <img className="backdrop" src="backdrop.png"/>
    <Switch>

      <AuthRoute exact path='/signup' component={Register} />
      <AuthRoute exact path='/login' component={Login} />
      <ProtectedRoute exact path='/panels/liked' component={LikedIndexContainer} />
      <ProtectedRoute exact path='/panels/authored' component={AuthoredIndexContainer} />
      <Route exact path="/" component={MainIndexContainer} />
      <ProtectedRoute exact path="/roots/new" component={createPanelContainer} />
      <ProtectedRoute path="/panels/:panelId/branch" component={branchPanelContainer} />
      <ProtectedRoute path="/panels/:panelId/edit" component={editPanelContainer} />
      <Route path="/panels/:panelId" component={PanelShow} />
    </Switch>
  </div>
);

export default App;