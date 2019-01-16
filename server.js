//const http = require('http');

const port = process.env.PORT || 6000;

const connectDB = require('./config/database');

connectDB(function(err, client){
    if(err) throw err;
    if(!err){
        var dbs = client.db('mydb');
        const app = require('./app')(dbs); // pass db instance to app
        app.listen(port);

        //const server = http.createServer(app);
        //server.listen(port);
    }

});

