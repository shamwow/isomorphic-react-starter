import React from 'react';
import { Route, DefaultRoute, Redirect } from 'react-router';

import App from './App';
import Empty from './components/Empty';
import Home from './components/Home';
import Test from './components/Test';
import Trail from './components/Trail';
import AddTrail from './components/AddTrail';

export default (
    <Route name="app" handler={App} path="/">
        <Route name="home" handler={Home} path="feed">
            <DefaultRoute handler={Empty} />
            <Route name="trail" path="trail/:trailId" handler={Trail} />
            <Route name="test" path="test/:trailId" handler={Test} />
            <Route name="addTrail" path="trail/add" handler={AddTrail} />
        </Route>
        <Redirect to="home" />
    </Route>
);
