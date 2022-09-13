const router = require('express').Router();
const controller = require('./movies.controller');
const cors = require('cors');
const correctMethodsOnly = require('../../errors/correctMethodsOnly');

router.use(cors());

router
    .route('/:movieId/theaters')
    .get(controller.theaters)
    .all(correctMethodsOnly);

router
    .route('/:movieId/reviews')
    .get(controller.reviews)
    .all(correctMethodsOnly);

router
    .route('/:movieId')
    .get(controller.read)
    .all(correctMethodsOnly);

router
    .route('/')
    .get(controller.list)
    .all(correctMethodsOnly);

module.exports = router;