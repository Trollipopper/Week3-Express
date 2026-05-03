function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const payload = {
    error: {
      message: err.message || 'Internal Server Error',
      details: err.details || null,
    },
  };
  if (process.env.NODE_ENV !== 'production' && err.stack) payload.error.stack = err.stack;
  res.status(status).json(payload);
}

export default errorHandler;
