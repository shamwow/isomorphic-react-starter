import React from 'react';
import { Route, DefaultRoute, Redirect } from 'react-router';

import App from './App';
import Home from './components/Home';

export default (
    <Route name="app" handler={App} path="/">
        <DefaultRoute name="home" handler={Home}></DefaultRoute>
        <Redirect to="home" />
    </Route>
);
