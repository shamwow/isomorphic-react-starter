import AppRoutes from '../shared/Routes';
import bodyParser from 'body-parser';
import config from './appconfig';
import { createStore } from 'redux';
import express from 'express';
import InitialStoreState from '../shared/constants/InitialStoreState';
import { Provider } from 'react-redux';
import React from 'react';
import Reducers from '../shared/reducers';
import Router from 'react-router';

const routes = express.Router();

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));

routes.use(express.static(config.static));

routes.get('/monitor/ping', (req, res) => {
    res.send(`I'm working!`);
});

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

    const store = createStore(Reducers, InitialStoreState);

    // Process current route.
    // state.routes contains the current route and its parent.
    // Handler is the React component that handlers the current route.
    router.run((Handler, state) => {
        const rendered = React.renderToString(
            <Provider store={store}>
                <Handler {...state} />
            </Provider>
        );
        // TODO: put into seperate file.
        res.send(`<html><head><link rel="stylesheet" type="text/css" href="/css/main.css" /></head><body><div id="app">${rendered}</div><script type="text/javascript" src="/js/bundle.js"></script></body></html>`);
    });
});

export default routes;
