const PageError = require('../../services/errors/page');

const getHandler = (req, res, next) => {
    try {
        return res.status(200).render('profile/index', req.user);
    }
    catch (err) {
        console.error('Page not loaded:', err);
        return next(new PageError('Page Not Loaded', req.url));
    }
}

module.exports = getHandler;