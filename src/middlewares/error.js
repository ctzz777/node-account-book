const logger = require('../utils/logger').getLogger('error');

const handleError = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      code = ctx.status;
      message = err.message;
      ctx.body = {
        code,
        message,
      }
      logger.error(err.stack);
      ctx.app.emit('error', err, ctx);
    }
  };
};

module.exports = {
  handleError,
};