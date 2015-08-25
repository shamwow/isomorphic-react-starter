import 'babel/polyfill';
import '../shared/utils/ArrayUtils';

import AppRoutes from '../shared/Routes';
import Flux from '../shared/Flux';
import FluxComponent from 'flummox/component';
import React from 'react';
import Router from 'react-router';
import RouteUtils from '../shared/utils/RouteUtils';

const flux = new Flux();

const router = Router.create({
    routes: AppRoutes,
    location: Router.HistoryLocation
});

router.run((Handler, state) => {
    RouteUtils.init(state.routes, {state, flux}).then(() => {

        const appRoot = (
            <FluxComponent flux={flux}>
                <Handler {...state} />
            </FluxComponent>
        );

        React.render(appRoot, document.getElementById('app'));
    });
});
