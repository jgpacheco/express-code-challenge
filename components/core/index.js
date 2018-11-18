const routes = require('./core.routes');

module.exports = (app) => {
  routes.forEach(({ method, path, handlers }) => {
    app[method](path, ...handlers);
  });

  return {};
};
