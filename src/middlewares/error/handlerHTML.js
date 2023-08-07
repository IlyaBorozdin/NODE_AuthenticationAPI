const errorHandlerJSON = require('./handlerJSON');

const errorHandlerHTML = (err, req, res, next) => {
    try {
        return res.status(err.statusCode).render('error/error', err);
    }
    catch (error) {
        console.error('Render error:', error);
        return errorHandlerJSON(err, req, res, next);
    }
};

module.exports = errorHandlerHTML;