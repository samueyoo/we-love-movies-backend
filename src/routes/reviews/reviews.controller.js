const service = require('./reviews.service');
const asyncErrorBoundary = require('../../errors/asyncErrorBoundary');

async function validateRequestBody(req, res, next) { //Not needed for project requirements, but available if needed
    const updatedReview = await req.body;
    if (updatedReview.score && updatedReview.content) return next();
    return next({
        status: 400,
        message: 'Score and/or content properties missing.'
    });
}

async function validateReviewId(req, res, next) {
    const reviewId = req.params.reviewId;
    const reviewData = await service.read(reviewId);
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
    const time = new Date().toISOString();
    const reviewId = res.locals.reviewData.review_id;
    const updatedReview = {
        ...req.body.data,
        review_id: reviewId,
    }

    await service.update(updatedReview);
    const rawData = await service.updateCritic(reviewId)
    const data = { ...rawData[0], created_at: time, updated_at: time }
    res.json({ data })
}

async function destroy(req, res) {
    const reviewId = req.params.reviewId;
    const destroyedReview = await service.destroy(reviewId);
    return res.sendStatus(204);
}

module.exports = {
    update: [
        //asyncErrorBoundary(validateRequestBody), //Not needed for project requirements
        asyncErrorBoundary(validateReviewId), 
        asyncErrorBoundary(update)
    ],
    delete: [
        asyncErrorBoundary(validateReviewId),
        asyncErrorBoundary(destroy)
    ]
}