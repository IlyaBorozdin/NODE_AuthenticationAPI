const express = require('express');
const path = require('path');
const appRoot = require('app-root-path');

const errorHandlerHTML = require('./handlerHTML');
const getErrorRouter = require('./getErrorRouter');

const publicDir = path.join(appRoot.toString(), 'public');

const errorRouter = getErrorRouter();

errorRouter.use(express.static(publicDir));
errorRouter.use(express.static(path.join(publicDir, 'error')));
errorRouter.use(errorHandlerHTML);

module.exports = errorRouter;