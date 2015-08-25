import React from 'react';
import { Navigation } from 'react-router';

import PropUtilsMixin from '../mixins/PropUtilsMixin';

export default React.createClass({
    mixins: [Navigation, PropUtilsMixin],

    getDefaultProps: function(){
        return {
            trail: null
        };
    },

    clickCard: function(trailId){
        this.transitionTo('trail', { trailId });
    },

    render: function(){
        const trail = Object.assign({
            id: 0,
            title: 'Sample Trail Really Long Title',
            author: 'Shahmeer O. U. M. Navid & Alex Fing',
            image: 'url("https://s3.amazonaws.com/images.dailydabbles.com/artwork/skull-link5243b4c783a87-crop-260x260-medium.png")'
        }, this.props.trail);

        const outerHexStyle = {
            width: '169px',
            height: '200px'
        };
        const innerHexStyle = Object.assign(outerHexStyle, { backgroundImage: trail.image });

        return (
            <div onClick={this.clickCard.bind(this, trail.id)} className={this.stringProp('className', 'trail-card')}>
                <div className="trail-card__outer-hexagon hexagon" style={outerHexStyle}>
                    <div className="trail-card__inner-hexagon hexagon" style={innerHexStyle}></div>
                </div>
                <div className="trail-card__description">
                    <p className="trail-card__description__title trail-card__description__line">{trail.title}</p>
                    <p className="trail-card__description__line-decoration">by</p>
                    <p className="trail-card__description__author trail-card__description__line">{trail.author}</p>
                    <div className="trail-card__description__divider"></div>
                </div>
            </div>
        );
    }
});
