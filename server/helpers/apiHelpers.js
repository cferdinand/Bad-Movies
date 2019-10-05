const request = require("request");
const axios = require("axios");
const { API_KEY } = require("../../config.js");

// write out logic/functions required to query TheMovieDB.org
module.exports = {
  getAPIGenres: () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US
      `;
    return axios.get(url).then(response => {
      return response.data;
    });
  },
  getAPIMovies: genreId => {
    let genre = genreId || "";
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&vote_average.lte=6&with_genres=${genre}`;
    return axios
      .get(url)
      .then(response => {
        console.log("data received");
        return response.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file
