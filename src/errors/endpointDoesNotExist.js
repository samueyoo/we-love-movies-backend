function endpointDoesNotExist(req, res, next) {
    next({
        status: 404,
        message: `${req.originalUrl} does not exist`
    })
}

module.exports = endpointDoesNotExist;