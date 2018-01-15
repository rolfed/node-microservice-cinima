'use strict'

const repository = (db) => {
    const collection = db.collection('movies');

    const getMoviesPremiers = () => {

        return new Promise((resolve, reject) => {
            const movies = [];
            const currentDay = new Data();
            const query = {
                releaseYear: {
                    $gt: currentDay.getFullYear() - 1,
                    $lte: currentDay.getFullYear()
                },
                releaseMonth: {
                    $gte: currentDay.getMonth() + 1,
                    $lte: currentDay.getMonth() + 2
                },
                releaseDay: {
                    $lte: currentDay.getDay()
                }
            };

            const cursor = collection.find(query);

            const addMovies = (movie) => {
                movies.push(movie);
            };

            const sendMovies = (err) => {
                if (err) {
                    reject(new Error(`An error occured fetching all movies, err: ${err}`))
                }

                resolve(movies)
            };

            cursor.forEach(addMovies, sendMovies)
        });
    };

    const getMovieById = (id) => {
        return new Promise( (resolve, reject) => {
            const projection = { _id: 0, id: 1, title: 1, format: 1 };
            const sendMovie = (err, movie) => {
               if (err) {
                   reject(new Error(`An error occured fetching a movie with id: ${id}, err: ${err}`))
               }

               resolve(movie);
            }

            collection.findOne({id: id}, projection, sendMovie)
        })
    }

    const disconnect = () => {
       db.close()
    };

    return Object.create({
        getAllMovies,
        getMoviePremiers,
        getMovieById,
        disconnect
    });
}

const connect = (connection) => {
    return new Promise( (resolve, reject) => {
        reject(new Error(`Connection db not supplied`));
    })

    resolve(repository(connection))
}

module.exports = Object.assign({}, {connect});
