const { addFavorite, deleteFavorite, getFavorite } = require("../models/movieModel.js");
const { getAPIGenres, getAPIMovies } = require("../helpers/apiHelpers.js");
const Promise = require("bluebird");
// const addFavoriteAsync = Promise.promisify(addFavorite);

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    let genreId = req.query.genre;

    if (genreId === "undefined") {
      genreId = undefined;
    }

    getAPIMovies(genreId)
      .then(({ results }) => {
        let movies = results.map(movie => {
          return { title: movie.title, genre_ids: movie.genre_ids, id: movie.id, vote_average: movie.vote_average, poster_path: movie.poster_path, overview: movie.overview, release_date: movie.release_date.slice(0, 4) };
        });
        res.send(movies).status(200);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    getAPIGenres()
      .then(({ genres }) => {
        res.send(genres).status(200);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  saveMovie: (req, res) => {
    addFavorite(req.body)
      .then(data => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  deleteMovie: (req, res) => {
    deleteFavorite(req.body)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  getFavs: (req, res) => {
    getFavorite()
      .then(results => {
        let movies = results.map(movie => {
          return { title: movie.title, genre_ids: movie.genre_ids, id: movie.id, vote_average: movie.vote_average, poster_path: movie.poster_path, overview: movie.overview, release_date: movie.release_date };
        });
        res.send(movies).status(200);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
