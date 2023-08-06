const errorHandlerJSON = require('./handlerJSON');

const errorHandlerHTML = (err, req, res, next) => {
    try {
        res.status(err.statusCode).render('error/error', err);
    }
    catch (error) {
        console.error('Render error:', error);
        errorHandlerJSON(err, req, res, next);
    }
};

module.exports = errorHandlerHTML;