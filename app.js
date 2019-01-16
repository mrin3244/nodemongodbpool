const express = require('express');
const app = express();

module.exports = function(dbs){

    const bodyparser = require('body-parser');

    const empRoutes = require('./routes/employees')(dbs);
    
    
    // get input from body
    app.use(bodyparser.urlencoded({extended:false}));
    app.use(bodyparser.json());
    
    // Routes which should handel request
    app.use('/emp', empRoutes);

    return app;
}
