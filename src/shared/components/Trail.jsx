import React from 'react';
import fluxMixin from 'flummox/mixin';

import AnimationMixin from '../mixins/AnimationMixin';
import Header from './Header';
import Step from './Step';

export default React.createClass({
    mixins: [AnimationMixin()],

    render: function(){
        return (
            <div className="trail">

            </div>
        );
    }
});
