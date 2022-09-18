if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require('./routes/movies/movies.router');
const theatersRouter = require('./routes/theaters/theaters.router');
const reviewsRouter = require('./routes/reviews/reviews.router');
const endpointDoesNotExist = require('./errors/endpointDoesNotExist');
const errorHandler = require('./errors/errorHandler');

app.use(express.json());

app.use('/movies', moviesRouter);
app.use('/theaters', theatersRouter);
app.use('/reviews', reviewsRouter);

app.use(endpointDoesNotExist);
app.use(errorHandler);

module.exports = app;
