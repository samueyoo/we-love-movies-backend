if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require('./routes/movies/movies.router');
const endpointDoesNotExist = require('./errors/endpointDoesNotExist');
const errorHandler = require('./errors/errorHandler');

app.use('/movies', moviesRouter);

app.use(endpointDoesNotExist);
app.use(errorHandler);

module.exports = app;
