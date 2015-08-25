import ApiDataStore from './ApiDataStore';
import ObjectUtils from '../utils/ObjectUtils';

export default class UserStore extends ApiDataStore {
    constructor(flux){
        super();

        const UserActionIds = flux.getActionIds('UserActions');
        this.registerAsyncAction(UserActionIds.fetchUser);
        this.registerAsyncAction(UserActionIds.fetchCurrentUser,
            this.handleFetchCurrentUser);
    }

    getUser(userId){
        return this.getData()[userId];
    }

    getUsers(){
        return this.getData();
    }

    getCurrentUser(){
        return this.getProperty('currentUser');
    }

    handleFetchCurrentUser(currentUser){
        try{
            this.setProperty('currentUser', ObjectUtils.values(currentUser)[0]);
        }
        catch(e){console.log('ERROR!', e.stack)}
    }
}
