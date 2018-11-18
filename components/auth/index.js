const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = (app) => {
  /* eslint global-require: "off", no-param-reassign: "off" */
  const AccessTokenService = require('./access-token.service')(app);

  app.use(passport.initialize({}));

  passport.use(new LocalStrategy((username, password, done) => {
    const UserService = app.services.UserService;

    UserService.findByUsername(username)
      .then((user) => {
        if (!user) { return done(null, false); }

        // TODO: password hash and salt.
        if (user.password !== password) { return done(null, false); }

        return done(null, user);
      })
      .catch(err => done(err));
  }));

  passport.use(new BearerStrategy((token, done) => {
    const UserService = app.services.UserService;

    AccessTokenService.find(token)
      .then((accessToken) => {
        if (!accessToken) { return null; }

        return UserService.findById(accessToken._id);
      })
      .then((user) => {
        if (!user) { return done(null, false); }

        return done(null, user);
      })
      .catch(err => done(err));
  }));

  app.services = app.services || {};
  app.services[AccessTokenService.name] = AccessTokenService;

  app.passport = passport;
};
