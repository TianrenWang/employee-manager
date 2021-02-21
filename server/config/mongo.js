const mongoose = require('mongoose');
const env = require('./env');
const Admin = require('../models/admin');

const connectMongo = () => {
    mongoose.connect(env.mongohost, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("mongo successfully connected");
        new Admin({username: "interview1", password: "12345"}).save((err, doc) => {
            if (err){
                console.error("Failed to create admin account interview");
            }
        })
        new Admin({username: "interview2", password: "12345"}).save((err, doc) => {
            if (err){
                console.error("Failed to create admin account interview2");
            }
        })
    }).catch(err => {
        console.error('mongo', 'connection to db failed', err.message || err);
        setTimeout(connectMongo, 2000);
    });
}

module.exports = connectMongo;
