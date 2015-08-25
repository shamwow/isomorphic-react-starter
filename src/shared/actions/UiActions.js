import { Actions } from 'flummox';

export default class UiActions extends Actions {
    search(searchValue){
        console.log('SEARCHING', searchValue);
        return searchValue;
    }
}
