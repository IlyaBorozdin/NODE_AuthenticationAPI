const express = require('express');
const cookieParser = require('cookie-parser');

const signUpHandler = require('./requests/signUp');
const activateHandler = require('./requests/activate');
const signInHandler = require('./requests/signIn');
const signOutHandler = require('./requests/signOut');
const refreshHandler = require('./requests/refresh');
//const authentication = require('../../middlewares/authentication');

const apiRouter = express.Router();

apiRouter.use(cookieParser());
apiRouter.use(express.urlencoded({extended: false}));

apiRouter.post('/signUp', signUpHandler);
apiRouter.get('/activate/:link', activateHandler);
apiRouter.post('/signIn', signInHandler);
apiRouter.post('/signOut', signOutHandler);
apiRouter.get('/refresh', refreshHandler);
/*
apiRouter.get('/test', authentication, (req, res, next) => {
    return res.status(200).json({ message: "Pass" });
});
*/

module.exports = apiRouter;