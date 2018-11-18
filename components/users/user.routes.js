const signinHandler = app => (req, res, next) => {
  const { _id } = req.user;
  const AccessTokenService = app.services.AccessTokenService;

  AccessTokenService.create(_id)
    .then(user => res.jsend.success(user))
    .catch(err => next(err));
};

const createHandler = app => (req, res, next) => {
  const UserService = app.services.UserService;

  UserService.create(req.body)
    .then(user => res.jsend.success(user))
    .catch(err => next(err));
};

module.exports = (app) => {
  const resourceName = 'users';
  const routes = [
    {
      method: 'post',
      path: `/${resourceName}/signin`,
      handlers: [
        app.passport.authenticate('local', { session: false }),
        signinHandler(app)
      ],
    },
    {
      method: 'post',
      path: `/${resourceName}`,
      handlers: [
        createHandler(app)
      ],
    }
  ];

  return routes;
};
