const errorHandlerJSON = (err, req, res, next) => {
    res.status(err.statusCode).json(err);
};

module.exports = errorHandlerJSON;