import { Store } from 'flummox';

export default class BaseStore extends Store {
    constructor(){
        super();
    }

    static serialize(obj){
        return JSON.stringify(obj);
    }

    static deserialize(data){
        return JSON.parse(data);
    }
}
