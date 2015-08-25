import { Flummox } from 'flummox';

import UiActions from './actions/UiActions';
import UiStore from './stores/UiStore';
import UserActions from './actions/UserActions';
import UserStore from './stores/UserStore';
import TrailActions from './actions/TrailActions';
import TrailStore from './stores/TrailStore';

export default class Flux extends Flummox {
    constructor(){
        super();

        this.createActions('UiActions', UiActions);
        this.createStore('UiStore', UiStore, this);

        this.createActions('UserActions', UserActions);
        this.createStore('UserStore', UserStore, this);

        this.createActions('TrailActions', TrailActions);
        this.createStore('TrailStore', TrailStore, this);
    }
};
