const createHandler = app => (req, res, next) => {
  const BookService = app.services.BookService;

  BookService.create(req.body)
    .then(book => res.jsend.success(book))
    .catch(err => next(err));
};

const listHandler = app => (req, res, next) => {
  const user = req.user;
  const BookService = app.services.BookService;

  BookService.list(user.institution)
    .then(books => res.jsend.success(books))
    .catch(err => next(err));
};

module.exports = (app) => {
  const resourceName = 'books';
  const routes = [
    {
      method: 'post',
      path: `/${resourceName}`,
      handlers: [
        createHandler(app)
      ],
    },
    {
      method: 'get',
      path: `/${resourceName}`,
      handlers: [
        app.passport.authenticate('bearer', { session: false }),
        listHandler(app)
      ],
    }
  ];

  return routes;
};
