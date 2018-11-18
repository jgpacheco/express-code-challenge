const createHandler = app => (req, res, next) => {
  const InstitutionService = app.services.InstitutionService;

  InstitutionService.create(req.body)
    .then(institution => res.jsend.success(institution))
    .catch(err => next(err));
};

module.exports = (app) => {
  const resourceName = 'institutions';
  const routes = [
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
