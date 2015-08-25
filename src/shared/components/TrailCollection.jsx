import React from 'react';
import TrailCard from './TrailCard';
import ObjectUtils from '../utils/ObjectUtils';

export default React.createClass({
    getDefaultProps: function(){
        return {
            trails: {},
            title: 'Trail Collection',
            color: '#007db6',
            width: '30%'
        };
    },

    render: function(){
        const trails = ObjectUtils.values(this.props.trails).map(trail => <TrailCard className="trail-collection__card" trail={trail} />);
        const color = this.props.color;
        const width = this.props.width;
        let className = 'trail-collection';
        if (this.props.className){
            className += ` ${this.props.className}`;
        }

        return (
            <div style={{width: width}} className={className}>
                <h3 className="trail-collection__title" style={{color: color}}>{this.props.title}</h3>
                <div style={{borderColor: color}} className="trail-collection__box">
                    {trails}
                </div>
            </div>
        );
    }
});
