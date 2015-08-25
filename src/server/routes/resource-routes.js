import express from 'express';
const routes = express.Router();

import models from "../models";

// ************************ Resources & Steps *********************

routes.get('/resource', function(req, res) {
    models.Resource.all().then(function(resources) {
        res.json(resources);
    })
});

routes.post('/resource', function(req, res) {
    var data = req.body;
    var trailId = req.body.trailId;
    var annotations = req.body.annotations;
    if(!(req.user)){
        res.status(401).send('Unauthorized');
    }

    models.Resource.findOrCreate({ where: { data: data.data, type: data.type } })
        .then(function(resource){
            models.Trail.find(trailId).then(function(trail) {
                trail.getResources().then(function(resources) {
                    resource[0].order = resources.length + 1;
                    resource[0].annotations = annotations;
                    trail.addResource(resource[0]);
                    res.json(resource[0]);
                })
            });
        }
    );
});

routes.put('/step/:trailId([0-9]+)', function(req, res) {
    var trailId = req.params.trailId;
    var resources = req.body.resources; // array of lists
    if(!(req.user)){
        res.status(401).send('Unauthorized');
    }

    for (var i = 0; i < resources.length; i++) {
        resources[i].order = i;
    }
    models.Trail.find(trailId).then(function(trail) {
        trail.setResources(resources, {order: 0, annotations: ''}).then(function(el) {
            res.json(trail);
        });
    });
});

routes.delete('/step/:trailId([0-9]+)/:order([0-9]+)', function(req, res) {
    models.Step.find({where: { order: order, trailId: trailId}}).then(function(step) {
        step.remove()
    });
    //TODO: unlink with resource and trail, decrement/increment other steps in that trail, destroy
});

export default routes;