const express = require('express');
const cookieParser = require('cookie-parser');

const apiRouter = express.Router();

apiRouter.use(cookieParser());

apiRouter.post('/signUp');
apiRouter.post('/signIn');
apiRouter.post('/signOut');
apiRouter.get('/activate/:link');
apiRouter.get('/refresh');

module.exports = apiRouter;