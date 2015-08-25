export default {
    stringProp: function(prop, ...props){
        return props.concat(this.props[prop] || '').join(' ');

    }
};
