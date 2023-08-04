const express = require('express');
const path = require('path');
const appRoot = require('app-root-path');

const errorHandler = require('./handler');
const NotFoundError = require('../../logic/serverError/notFound');

const publicDir = path.join(appRoot.toString(), 'public');

const errorRouter = express.Router();

errorRouter.use((req, res, next) => {
    next(new NotFoundError('Not Found', req.url));
});

errorRouter.use(express.static(publicDir));
errorRouter.use(express.static(path.join(publicDir, 'error')));
errorRouter.use(errorHandler);

module.exports = errorRouter;