import React from 'react/addons';
import { RouteHandler } from 'react-router';
import fluxMixin from 'flummox/mixin';

import Animator from './Animator';
import Header from './Header';
import TrailCard from './TrailCard';

export default React.createClass({
    statics: {
        init: async function({state, flux}){
            console.log('caling init');
            const user = await flux.getActions('UserActions').fetchCurrentUser();
            await flux.getActions('TrailActions').fetchTrailsForUser(user.id);
        }
    },

    mixins: [fluxMixin(['UserStore', 'TrailStore'], ([UserStore, TrailStore]) => {
        const currentUser = UserStore.getCurrentUser();
        return {
            currentUser,
            trails: TrailStore.getTrailsForUser(currentUser.id)
        }
    })],

    render: function(){
        return (
            <div className="home">
                <Header />
                <div className="content">
                    <TrailCard />
                    <RouteHandler key={this.props.pathname} />
                </div>
            </div>
        );
    }
});
