const errorHandlerJSON = require('./handlerJSON');
const getErrorRouter = require('./getErrorRouter');

const errorRouter = getErrorRouter();

errorRouter.use(errorHandlerJSON);

module.exports = errorRouter;