const service = require('./reviews.service');
const asyncErrorBoundary = require('../../errors/asyncErrorBoundary');

async function validateRequestBody(req, res, next) {
    const updatedReview = await req.body;
    if (updatedReview.score && updatedReview.content) return next();
    return next({
        status: 400,
        message: 'Score and/or content properties missing.'
    });
}

async function validateReviewId(req, res, next) {
    const reviewId = req.params.reviewId;
    const reviewData = await service.getReview(reviewId);
    if (reviewData) {
        res.locals.reviewData = reviewData;
        return next();
    };
    return next({
        status: 404,
        message: 'Review cannot be found.'
    });
}

async function update(req, res) {
    const reviewId = req.params.reviewId;
    const updatedReview = await service.update(req.body, reviewId);
    return res.json({ data: await service.getReview(reviewId) }) 
    //Need to adjust service file to nest critic data
}

async function destroy(req, res) {
    const reviewId = req.params.reviewId;
    const destroyedReview = await service.destroy(reviewId);
    return res.sendStatus(204);
}

module.exports = {
    update: [
        //asyncErrorBoundary(validateRequestBody), //Not needed for project requirements?
        asyncErrorBoundary(validateReviewId), 
        asyncErrorBoundary(update)
    ],
    delete: [
        asyncErrorBoundary(validateReviewId),
        asyncErrorBoundary(destroy)
    ]
}