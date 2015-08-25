let output = function(componentDidMount = function(){}){
    return { componentDidMount };
};

output = function(componentDidMount = function(){}){
    return {
        componentDidMount: function(){
            const transitions = this.transitions && this.transitions() || [];
            transitions.forEach(transition => {
                let animate = transition.animation;
                const to = document.getElementById(transition.to);
                const from = document.getElementById(transition.from);
                if (to && from && animate){
                    animate(from, to);
                }
            });
            componentDidMount();
        }
    };
};

export default output;
