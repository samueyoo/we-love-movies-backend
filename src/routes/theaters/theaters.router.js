const router = require('express').Router();
const controller = require('./theaters.controller')
const cors = require('cors');
const correctMethodsOnly = require('../../errors/correctMethodsOnly');

router.use(cors());

router
    .route('/')
    .get(controller.list)
    .all(correctMethodsOnly);

module.exports = router;