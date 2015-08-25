import BaseStore from './BaseStore';

export default class ApiDataStore extends BaseStore {
    constructor(flux){
        super();

        this.state = {
            error: null,
            data: null,
            fetching: false,
            props: {}
        };
    }

    getData(){
        return this.state.data;
    }

    getProperty(key){
        return this.state.props[key];
    }

    setProperty(key, value){
        let obj = {};
        obj[key] = value;
        this.setState({props: Object.assign(obj, this.state.props)});
    }

    registerAsyncAction(action, success=function(){}){
        this.registerAsync(action, this.handleBegin,
            this.handleSuccess.bind(this, success.bind(this)), this.handleError);
    }

    handleBegin(){
        this.setState({fetching: true, error: null});
    }

    handleError(error){
        this.setState({fetching: false, error: error});
        console.log(error);
    }

    handleSuccess(success, data){
        const newData = Object.assign({}, this.getData(), data);
        this.setState({fetching: false, error: null, data: newData});
        if (typeof success === 'function'){
            success(data);
        }
    }
}
