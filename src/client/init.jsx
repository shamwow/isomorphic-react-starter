import 'babel/polyfill';
import '../shared/utils/ArrayUtils';

import AppRoutes from '../shared/Routes';
import { createStore } from 'redux';
import InitialStoreState from '../shared/constants/InitialStoreState';
import { Provider } from 'react-redux';
import React from 'react';
import Reducers from '../shared/reducers';
import Router from 'react-router';

const router = Router.create({
    routes: AppRoutes,
    location: Router.HistoryLocation
});

const store = createStore(Reducers, InitialStoreState);

router.run((Handler, state) => {
    const appRoot = (
        <Provider store={store}>
            <Handler {...state} />
        </Provider>
    );

    React.render(appRoot, document.getElementById('app'));
});
