import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

import MainPage from './main/main_page';
import PanelShow from './panel/show/panel_show';

const App = () => (
  <Switch>
    <AuthRoute exact path="/" component={MainPage} />
    <Route path="/panels/:panelId" component={PanelShow} />
  </Switch>
);

export default App;