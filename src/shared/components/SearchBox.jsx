import fluxMixin from 'flummox/mixin';
import React from 'react';

export default React.createClass({
    mixins: [fluxMixin(['UiStore'], ([UiStore]) => ({
        searchValue: UiStore.searchValue
    }))],

    getInitialState: function(){
        return {
            searchValue: ''
        };
    },

    getDefaultProps: function(){
        return {
            placeholder: 'Search...'
        };
    },

    search: function(event){
        const text = event.target.value;
        this.flux.getActions('UiActions').search(text);
    },

    render: function(){
        let className = 'search-box';
        if (this.props.className){
            className += ` ${this.props.className}`;
        }
        return (
            <input onChange={this.search} className={className} placeholder={this.props.placeholder} />
        );
    }
});
