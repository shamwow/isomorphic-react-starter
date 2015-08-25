import { Actions } from 'flummox';
import fetch from 'isomorphic-fetch';

const trails = {
    '0': {
        name: 'Awesome Trail 1',
        id: '0',
        userId: '0',
        steps: [
            {
                name: 'Step 1',
                link: 'https://www.google.ca/?gws_rd=ssl'
            },
            {
                name: 'Step 2',
                link: 'https://www.google.ca/?gws_rd=ssl'
            },
            {
                name: 'Step 3',
                link: 'https://www.google.ca/?gws_rd=ssl'
            }
        ],
        image: 'https://s3.amazonaws.com/images.dailydabbles.com/artwork/skull-link5243b4c783a87-crop-260x260-medium.png'
    },
    '1': {
        name: 'Awesome Trail 2',
        id: '1',
        userId: '0',
        steps: [
            {
                name: 'Step 1',
                link: 'https://www.google.ca/?gws_rd=ssl'
            },
            {
                name: 'Step 2',
                link: 'https://www.google.ca/?gws_rd=ssl'
            },
            {
                name: 'Step 3',
                link: 'https://www.google.ca/?gws_rd=ssl'
            }
        ],
        image: 'https://s3.amazonaws.com/images.dailydabbles.com/artwork/skull-link5243b4c783a87-crop-260x260-medium.png'
    },
    '2': {
        name: 'Awesome Trail 3',
        id: '2',
        userId: '0',
        steps: [
            {
                name: 'Step 1',
                link: 'https://www.google.ca/?gws_rd=ssl'
            },
            {
                name: 'Step 2',
                link: 'https://www.google.ca/?gws_rd=ssl'
            },
            {
                name: 'Step 3',
                link: 'https://www.google.ca/?gws_rd=ssl'
            }
        ],
        image: 'http://alexanderfung.me/assets/images/about.jpg'
    },
    '3': {
        name: 'Awesome Trail 4',
        id: '3',
        userId: '0',
        steps: [
            {
                name: 'Step 1',
                link: 'https://www.google.ca/?gws_rd=ssl'
            },
            {
                name: 'Step 2',
                link: 'https://www.google.ca/?gws_rd=ssl'
            },
            {
                name: 'Step 3',
                link: 'https://www.google.ca/?gws_rd=ssl'
            }
        ],
        image: 'http://www.thetimes.co.uk/tto/multimedia/archive/00238/99224565_Python_238359b.jpg'
    }
};

export default class TrailActions extends Actions {
    async fetchTrail(trailId){
        console.log('fetching trails');
        const data = await fetch(`http://localhost:8000/api/trail/${trailId}`);
        // console.log('THE DATA!!!!', data);

        if (trails[trailId]){
            let obj = {};
            obj[trailId] = trails[trailId];
            return obj;
        }
        else {
            throw new Error('404');
        }
    }

    async fetchTrailsForUser(userId){
        // const data = await fetch(`http://localhost:8000/api/user/1/`).then(data => data.json());
        // let r = data.Trails.reduce((map, trail) => {
        //     let obj = {};
        //     obj[trail.id] = trail;
        //     return Object.assign(obj, map);
        // }, {});
        // return r;
        console.log('fetching trails for user');
        return trails;
    }
}
