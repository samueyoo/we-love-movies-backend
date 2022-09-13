const service = require('./movies.service');
const asyncErrorBoundary = require('../../errors/asyncErrorBoundary');

async function list(req, res) {
    if (req.query.is_showing = true) {
        return res.json({ data: await service.listIsShowing()});
    }
    res.json({ data: await service.list() });
}

module.exports = {
    list: asyncErrorBoundary(list),
}