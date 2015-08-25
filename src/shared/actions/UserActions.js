import { Actions } from 'flummox';
import fetch from 'isomorphic-fetch';

export default class UserActions extends Actions {
    async fetchUser(userId){
        return {
            '0': {
                name: 'Alexander Fung',
                id: '0'
            }
        };
    }

    async fetchCurrentUser(){
        return {
            '0': {
                name: 'Mike Kirkup',
                id: '0'
            }
        };
    }
}
