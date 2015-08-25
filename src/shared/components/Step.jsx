import React from 'react';

export default React.createClass({
    clickStep: function(link){
        console.log('open link!!!');
    },

    render: function(){
        const step = this.props.step;

        return (
            <div onClick={this.clickStep.bind(this, step.link)} className="trail-step">
                <div className="hexagon trail-step__emblem"></div>
                <div className="trail-step__step-info">
                    <h3 className="trail-step__step-info__title">{step.name}</h3>
                    <h5 className="trail-step__step-info__link">
                        <a href={step.link} target="_blank">{step.link}</a>
                    </h5>
                </div>
            </div>
        );
    }
});
