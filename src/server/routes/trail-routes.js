import express from 'express';
const routes = express.Router();

import models from "../models";

// ******************* TRAIL **********************
routes.get('/trail', (req, res) => {
    models.Trail.all().then(function(trails) {
        res.json(trails);
    })
});

routes.post('/trail', (req, res) => {
    var data = req.body;
    var listOfTags = req.body.tags;
    models.Trail.create({name: data.name,
        description: data.description, date_created: new Date(),
        forked_from: data.forked_from, num_views: 0}).then(function(result){
            if(!(req.user)){
                res.status(401).send('Unauthorized');
            }
            req.user.addTrail(result);
            for(var tagName in listOfTags) {
                models.Tag.findOrCreate({where: {name: tagName}}).then(function(tag) {
                    models.Trail.find(result.id).then(function(trail){
                        trail.addTag(tag);
                    })
                });
            }
            res.json(result);
        });
});

routes.get('/trail/:id([0-9]+)', function(req, res){
    var trailId = req.params.id;
    models.Trail.find({ where: {id: trailId}, include: [{ all: true }]}).then(function(trail) {
        if (trail != null) {
            res.json(trail);
        } else {
            res.status(404).send('Sorry, we cannot find that!');
        }
    });
});

routes.post('/trail/:id([0-9]+)', function(req, res){
    var action = req.query.action;
    var trailId = req.params.id;
    if (action == 'fork') {
        if(!(req.user)){
            res.status(401).send('Unauthorized');
        }
        models.Trail.find(trailId).then(function(trail) {
            models.Trail.create({name: trail.name,
                description: trail.description, date_created: new Date(),
                forked_from: trail.getUsers()[0], num_views: 0
            }).then(function(result) {
                req.user.addTrail(result);
                trail.getResources().then(function(resources) {
                    resources.forEach(element => {
                        result.addResource(element);
                    });
                    res.json(result);
                });
            });
        });
    } else {
        res.status(400).send('Sorry, we cannot accept that action');
    }
});

routes.put('/trail/:id([0-9]+)', (req, res) =>{
    if(!(req.user)){
        res.status(401).send('Unauthorized');
    }

    var trailId = req.params.id;
    var data = req.body;
    var newListOfTags = req.body.newTags;
    var listOfDeletedTags = req.body.deletedTags;
    models.Trail.find(trailId).then(function(trail) {s
        if (trail) {
            trail.updateAttributes({
                name: data.name, description: data.description,
                    date_created: data.date_created, forked_from: data.forked_from,
                    num_views: data.num_views
                }).then(function() {
                    for(var tagName in newListOfTags) {
                        models.Tag.findOrCreate({where: {name: tagName}}).then(function(tag) {
                            trail.addTag(tag);
                        });
                    }
                    for(var tagName in listOfDeletedTags) {
                        models.Tag.findOrCreate({where: {name: tagName}}).then(function(tag) {
                            trail.removeTag(tag);
                        });
                    }
                res.send("Success!");
            });
        }
    });
});

routes.delete('/trail/:id([0-9]+)', (req, res) => {
    if(!(req.user)){
        res.status(401).send('Unauthorized');
    }

    var trailId = req.params.id;
    models.Trail.find(trailId).on('success', function(trail){
        trail.removeResource();
        trail.destroy().on('success', function(a) {
            if (a && a.deletedAt){
                res.send("SUCCESS!");
            }
        });
    });
});

export default routes;