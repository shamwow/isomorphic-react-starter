export default {
    // Runs init method of route handler and its parents.
    init: async (routes, params) => {
        return Promise.all(routes
            .map(route => route.handler['init'])
            .filter(method => typeof method === 'function')
            .map(method => method(params))
        ).catch(err => console.error(err.stack));
    }
};
