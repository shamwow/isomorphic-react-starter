import React from 'react';
import fluxMixin from 'flummox/mixin';

import Header from './Header';

export default React.createClass({
    getInitialState: function(){
        return {
            form: {
                name: ''
            }
        };
    },

    input: function(form, value){
        this.state.form[form] = value;
    },

    submit: function(){
        this.flux.getActions('TrailActions').createTrail(this.state.form);
    },

    render: function(){
        return (
            <div className="add-trail">
                <Header />
                <div className="content">
                    <div className="add-trail">
                        <div className="add-trail__input">
                            <p className="label">Trail Name</p>
                            <input className="add-trail__input" onChange={this.input.bind('name')} placeholder="Enter Trail Name..." />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
