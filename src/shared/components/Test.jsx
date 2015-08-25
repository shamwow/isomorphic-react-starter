import React from 'react';

import AnimationMixin from '../mixins/AnimationMixin';

export default React.createClass({

    mixins: [AnimationMixin()],

    transitions: function(){
        return [{from: this.props.params.trailId, to: 'test'}];
    },

    render: function(){
        return (
            <div className="test">
                OMG THIS WORKED
                <div id="test" style={{background:'red', width:'200px', height:'200px'}}>

                </div>
            </div>
        );
    }
});
