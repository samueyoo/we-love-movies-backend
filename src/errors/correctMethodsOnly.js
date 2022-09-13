function correctMethodsOnly(req, res, next) {
    next({
        status: 405,
        message: `Endpoint cannot be used with ${req.method} requests`,
    })
}

module.exports = correctMethodsOnly;