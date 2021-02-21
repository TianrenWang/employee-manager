const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

// import routes
const adminRoutes = require('./routes/admin').router;
const employeeRoutes = require('./routes/employee').router;

// initialize the app
const app = express();

// middleware

// for allowing angular client to access backend API
app.use(cors());

// makes the body of the request accessible in the API endpoint
app.use(bodyParser.json());

// activates authentication
app.use(passport.initialize());
require('./config/passport')(passport);

// set routes
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);

module.exports = app;
