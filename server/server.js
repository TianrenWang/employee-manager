const http = require('http');
const app = require('./app');
const env = require('./config/env');
const connectMongo = require('./config/mongo');

// init server instance
const server = http.createServer(app);

// connect to mongoDB database
connectMongo();

// start server
server.listen(env.port, err => {
    if (err) {
        console.error('server', 'could not start listening', err.message || err);
        process.exit();
    }
    console.log(`Express server is listening on ${env.port}...`);
});
