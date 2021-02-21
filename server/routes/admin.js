const Admin = require('../models/admin');
const router = require('express').Router();
const badLoginInfoError = new Error("The login provided lacks either username or password");
const jwt = require('jsonwebtoken');
const env = require('../config/env');

const authorize = function(req, res){
    let response = {};
    if (!req.body.username || !req.body.password){
        response.success = false;
        response.error = badLoginInfoError;
        res.json(response);
        return;
    }
    Admin.findOne(req.body, (error, admin) => {
        if (error) {
            response.success = false;
            response.error = error;
            res.json(response);
            return;
        }
        if (admin) {
            let payload = {username: admin.username, _id: String(admin._id)};
            response.auth_token = 'JWT ' + jwt.sign(payload, env.secret);
            response.success = true;
            response.admin = admin;
        }
        res.json(response);
    });
}

router.post('/authorize', authorize);
exports.router = router;
exports.authorize = authorize;