const express = require('express');

const NotFoundError = require('../../services/errors/notFound');
const ServerError = require('../../services/errors/server');

function getErrorRouter() {
    const errorRouter = express.Router();

    errorRouter.use((req, res, next) => {
        throw new NotFoundError('Not Found', req.url);
    });
    errorRouter.use((err, req, res, next) => {
        const serverError = err instanceof ServerError ? err : new ServerError();
        next(Object.assign({}, serverError, { message: serverError.message}));
    });

    return errorRouter;
}

module.exports = getErrorRouter;