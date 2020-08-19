import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreateUser from './pages/CreateUser';

const Routes = () => (
  <BrowserRouter>
    <Route component={Home} path="/" exact />
    <Route component={CreateUser} path="/create-user" exact />
  </BrowserRouter>
);

export default Routes;
