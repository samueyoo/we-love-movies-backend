const router = require('express').Router();
const controller = require('./reviews.controller');
const cors = require('cors');
const correctMethodsOnly = require('../../errors/correctMethodsOnly');

router.use(cors());

router
    .route('/:reviewId')
    .put(controller.update)
    .delete(controller.delete)
    .all(correctMethodsOnly);

module.exports = router;