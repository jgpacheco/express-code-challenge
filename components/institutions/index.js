module.exports = (app) => {
  /* eslint global-require: "off", no-param-reassign: "off" */
  const routes = require('./institution.routes')(app);
  const InstitutionService = require('./institution.service')(app);

  routes.forEach(({ method, path, handlers }) => {
    app[method](path, ...handlers);
  });

  app.services = app.services || {};
  app.services[InstitutionService.name] = InstitutionService;

  return {};
};
