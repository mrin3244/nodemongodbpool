const express = require('express');
//const router = express.Router();
const mongodb = require('mongodb');
const Joi = require('joi');

module.exports = function(dbs){
    const router = express.Router();
    router.get('/', (req, res, next) => {
        dbs.collection('employee').find().toArray(function(err, docs){
            if(docs){
                return res.status(200).json(docs);
            }
            if(err){
                return res,status(500).json({"error":err});
            }
        
        });
        
    });

    router.post('/', (req, res, next) => {
        const dataset = {
            name: req.body.name,
            empNo: req.body.empNo,
            post: req.body.post,
            email: req.body.email
        };
        // create a blueprint of validation rule
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            empNo: Joi.number().required(),
            post: Joi.string().required(),
            email: Joi.string().email().required(),

        });
        // pass three parameter 1. what will be validate, 2. blueprint, 3. function 
        Joi.validate(dataset, schema, (err, result) => {
            if(err){
                return res.status(500).json({"error": err});
            }
            if(result){
                dbs.collection('employee').insertOne(dataset, function(err, result) {
                    if(result){
                        return res.status(200).json({"message": "create collection and insert data"});
                    }
                    if(err){
                        return res.status(500).json({"error":err});
                    }
                });

            }

        });
        
    });

    router.get('/:eId', (req, res, next) => {
        const eId = mongodb.ObjectID(req.params.eId);
        //console.log(eId);
        dbs.collection('employee').findOne({"_id":eId}, function(err, doc){
            if(doc){
                console.log(doc);
                res.status(200).json(doc);
            }
            if(err){
                return res.status(500).json({"error":err});
            }
        });
        
    });

    router.patch('/:eId', (req, res, next) => {
        var eId = mongodb.ObjectID(req.params.eId);
        var collection = dbs.collection('employee');
        collection.updateOne({"_id":eId}, {$set: req.body}, function(err,result){
            if(result){
                return res.status(200).json({"message":"update account "+eId});
            } 
            if(err){
                return res.status(500).json({"error":err});
            }
        });
    });

    router.delete('/:eId', (req, res, next) => {
        const eId = mongodb.ObjectID(req.params.eId);
        //console.log(eId);
        dbs.collection('employee').deleteOne({"_id":eId}, function(err, result){
            if(result){
                res.status(200).json(result);
            }
            if(err){
                return res.status(500).json({"error":err});
            }
        });
        
    });


    return router;
};