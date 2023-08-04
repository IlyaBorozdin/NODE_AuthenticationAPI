const ServerError = require('../../logic/serverError/server');

const errorHandler = (err, req, res, next) => {
    const serverError = err instanceof ServerError ? err : new ServerError();
    const objError = {
        message: serverError.message,
        statusCode: serverError.statusCode,
        userMessage: serverError.userMessage,
        developerMessage: serverError.developerMessage
    };
    try {
        res.status(objError.statusCode).render('error/error', objError);
    }
    catch (error) {
        console.error('Render error:', error);
        res.status(objError.statusCode).json(objError);
    }
};

module.exports = errorHandler;