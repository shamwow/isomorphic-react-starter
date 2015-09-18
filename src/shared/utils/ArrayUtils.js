Array.prototype.last = function(){
    return this[this.length - 1];
};

Array.prototype.toMap = function(prop) {
    if (props) {
        return this.reduce((accum, item) => ({...accum, [item[prop]]: item}), {});
    }
    return this.reduce((accum, item) => ({...accum, [item]: true}));
}
