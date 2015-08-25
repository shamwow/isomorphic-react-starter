import express from 'express';
const routes = express.Router();

import models from "../models";

// *********************** USER *******************************

routes.get('/user', function(req, res) {
    models.User.all().then(function(users) {
        res.json(users);
    })
});

routes.get('/user/:id([0-9]+)', function(req, res) {
    var userId = req.params.id;
    models.User.find({ where: {id: userId}, include: [{ all: true }]}).then(function(user) {
        if (user != null) {
            res.json(user);
        } else {
            res.status(404).send('Sorry, we cannot find that!');
        }
    });
});

routes.put('/user/:id([0-9]+)', function(req, res) {
    if(!(req.user)){
        res.status(401).send('Unauthorized');
    }

    var userId = req.params.id;
    var data = req.body;

    models.User.find(userId).then(function(user) {
        if (user) {
            user.updateAttributes({
                name: data.name, first_name: data.first_name,
                    last_name: data.last_name, email: data.email,
                    url: data.url, description: data.description, dob: data.dob,
                    education: data.education, field: data.field, gender: data.gender
            }).then(function() {
                res.send("Success!")
            })
        }
    });
});

routes.delete('/user/:id([0-9]+)', function(req, res) {
    if(!(req.user)){
        res.status(401).send('Unauthorized');
    }

    var userId = req.params.id;
    res.send(userId);
    models.User.find(userId).then(function(user) {
        user.getTrails().then(function(listOfTrails) {
            for (let trail in listOfTrails) {
                trail.removeResources(); //remove all Resources - check API
                trail.destroy();
            }
            user.destroy().then(function(action){
                res.send("Deleted!");
            });
        });

    });
});

export default routes;