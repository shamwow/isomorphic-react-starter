export default {
    values: function(obj){
        let output = [];
        for (let key in obj){
            output.push(obj[key]);
        }
        return output;
    }
}
