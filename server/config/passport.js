// Defines the authentication mechanism

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Admin = require('../models/admin');
const env = require('./env');

module.exports = passport => {
  let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: env.secret,
  };

  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      Admin.findById(jwt_payload._id, (err, admin) => {
        if (err) {
          return done(err, false);
        }

        if (admin) {
          let signData = {
            _id: String(admin._id),
            username: admin.username,
          };
          return done(null, signData);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
