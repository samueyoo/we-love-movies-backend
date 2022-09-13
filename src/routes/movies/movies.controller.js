const service = require('./movies.service');
const asyncErrorBoundary = require('../../errors/asyncErrorBoundary');

async function list(req, res) {
    if (req.query.is_showing) {
        return res.json({ data: await service.listIsShowing()});
    }
    res.json({ data: await service.list() });
}

async function validateMovieId(req, res, next) {
    const movieId = req.params.movieId;
    const data = await service.read(movieId);
    if (data) {
        res.locals.data = data;
        return next()
    };
    next({
        status: 404,
        message: 'Movie cannot be found.'
    });
}

async function read(req, res) {
    const data = res.locals.data;
    return res.json({ data: data });
}

async function theaters(req, res) {
    const movieId = req.params.movieId;
    return res.json({ data: await service.theaters(movieId) })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(validateMovieId), asyncErrorBoundary(read)],
    theaters: [asyncErrorBoundary(validateMovieId), asyncErrorBoundary(theaters)]
}