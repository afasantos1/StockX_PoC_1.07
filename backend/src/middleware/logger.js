const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      timestamp: new Date().toISOString(),
    };

    if (res.statusCode >= 400) {
      console.error('HTTP Error:', logData);
    } else {
      console.log('HTTP Request:', logData);
    }
  });

  next();
};

const errorLogger = (err, req, res, next) => {
  console.error('Error Logger:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
  next(err);
};

module.exports = { requestLogger, errorLogger };
