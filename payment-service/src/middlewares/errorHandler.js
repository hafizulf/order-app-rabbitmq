const errorHandler = (err, req, res, next) => {
  console.error(err); // For debugging

  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      message: err.message,
    });
  }

  if (err.name === 'BadRequestError') {
    return res.status(400).json({
      message: err.message,
    });
  }

  // Default to 500 server error
  res.status(500).json({
    message: 'An unexpected error occurred',
  });
};

module.exports = errorHandler;
