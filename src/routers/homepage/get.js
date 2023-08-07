const path = require('path');
const PageError = require('../../services/errors/page');

function getHandler(indexPath) {
    return (req, res, next) => {
        try {
            return res.status(200).sendFile(indexPath);
        } catch (err) {
            console.error('Page not loaded:', err);
            return next(new PageError('Page Not Loaded', req.url));
        }
    };
}

module.exports = getHandler;