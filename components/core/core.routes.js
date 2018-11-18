module.exports = [
  {
    method: 'get',
    path: '/',
    handlers: [
      (req, res) => {
        res.end('Express Code Challenge Started');
      }
    ],
  }
];
