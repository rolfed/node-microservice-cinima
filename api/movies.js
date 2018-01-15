'use strict'
const status = require('http-status');

module.exports = (app, options) => {
    const {repo} = options;

    app.get('/movies', (req, res, next) => {
        repo.getAllMovies().then(movies => {
            res.status(status.Ok).json(movies);
        }).catch(next);
    });

    app.get('/movies/premeries', (req, res, next) => {
       repo.getMoviesPremiers().then(movies => {
           res.status(status.OK).json(movies);
       });
    }).catch(next)

    app.get('/movies/:id', (req, res, next) => {
       res.status(status.OK).json(movie);
    }).catch(next);
}
