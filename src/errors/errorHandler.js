function errorHandler(err, req, res, next) {
    const defaultMsg = 'Uh oh, something went wrong and everything is horrible';
    const { status = 500, message = defaultMsg } = err;
    res.status(status).json({ error: message });
}

module.exports = errorHandler;