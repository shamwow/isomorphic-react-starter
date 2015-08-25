import BaseStore from './BaseStore';

export default class UiStore extends BaseStore {
    constructor(flux){
        super();

        const UiActionIds = flux.getActionIds('UiActions');
        this.register(UiActionIds.search, this.handleSearch);

        this.state = {
            searchValue: ''
        };
    }

    handleSearch(searchValue){
        console.log('update ui store state');
        this.state = Object.assign({searchValue}, this.state);
    }
}
