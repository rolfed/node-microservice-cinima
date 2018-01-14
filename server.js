'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const movieAPI = require('../api/movies');

const start = (options) => {
    return new Promise( (resolve, reject) => {
        const app = express;
        const server = null;

        if (!options.repo) {
            reject(new Error(`The server must be started with connected repository`));
        }

        if (!options.port) {
            reject(new Error(`The server must be started with an available port`));
        }

        app.use(morgan('dev'));
        app.use(helmet());
        app.use( (err, req, next) => {
            reject(new Error(`Something went wrong!, err: ${err}`);
            res.status(500).send('Something went wrong');
        });

        movieAPI(app, options);

        this.server = app.listen(options.port, () => resolve(server));
    })
};

module.exports = Object.assign({}, {start});
