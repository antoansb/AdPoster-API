const notFoundMiddleware = (req, res) => {
  res.status(404).send('Invalid route');
};

module.exports = notFoundMiddleware;
