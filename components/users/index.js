module.exports = (app) => {
  /* eslint global-require: "off", no-param-reassign: "off" */
  const routes = require('./user.routes')(app);
  const UserService = require('./user.service')(app);

  routes.forEach(({ method, path, handlers }) => {
    app[method](path, ...handlers);
  });

  app.services = app.services || {};
  app.services[UserService.name] = UserService;

  return {};
};
