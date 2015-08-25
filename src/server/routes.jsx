import bodyParser from 'body-parser';
import config from './appconfig';
import express from 'express';
import FluxComponent from 'flummox/component';
import React from 'react';
import Router from 'react-router';
import RouteUtils from '../shared/utils/RouteUtils';

import App from '../shared/App';
import Flux from '../shared/Flux';
import AppRoutes from '../shared/Routes';
import TrailRoutes from './routes/trail-routes';
import TagRoutes from './routes/tag-routes';
import AuthRoutes from './routes/auth-routes';
import UserRoutes from './routes/user-routes';
import ResourceRoutes from './routes/resource-routes';

const routes = express.Router();

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));

routes.use(express.static(config.static));

routes.get('/monitor/ping', (req, res) => {
    res.send(`I'm working!`);
});

routes.use('/api', TrailRoutes);
routes.use('/api', TagRoutes);
routes.use('/api', AuthRoutes);
routes.use('/api', UserRoutes);
routes.use('/api', ResourceRoutes);

routes.get('*', (req, res) => {
    const router = Router.create({
        routes: AppRoutes,
        location: req.url,
        onError: err => process.stderr.write(err.stack + '\n'),
        // Can't use arrow syntax since it autobinds.
        onAbort: function(reason){
            if (reason.constructor.name === 'Redirect'){
                res.redirect(302, this.makePath(reason.to, reason.params, reason.query));
            }
            else {
                console.err('Unhandled abort transition.');
            }
        }
    });
    const flux = new Flux();

    // Process current route.
    // state.routes contains the current route and its parent.
    // Handler is the React component that handlers the current route.
    router.run((Handler, state) => {
        // Run init method of current route.
        RouteUtils.init(state.routes, {state, flux}).then(() => {
            // Since no asynchronous data is being fetched (data should be fetched in init
            // function of routes), we can safely renderToString.
            const rendered = React.renderToString(
                <FluxComponent flux={flux}>
                    <Handler {...state} />
                </FluxComponent>
            );
            // TODO: put into seperate file.
            res.send(`<html><head><link rel="stylesheet" type="text/css" href="/css/main.css" /></head><body><div id="app">${rendered}</div><script type="text/javascript" src="/js/bundle.js"></script></body></html>`);
        }).catch(err => { process.stderr.write(err.stack + '\n'); });
    });
});

export default routes;
