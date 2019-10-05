import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
// import AnyComponent from './components/filename.jsx'
import Favs from "./components/Favs.jsx";
import Movies from "./components/Movies.jsx";
import Nav from "./components/Nav.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      favorites: [],
      showFaves: false
    };

    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.getFavs = this.getFavs.bind(this);
  }

  componentDidMount() {
    this.getMovies();
    this.getGenres();
    this.getFavs();
  }

  getMovies(genreId) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios
      .get(`/movies/search?genre=${genreId}`)
      .then(({ data }) => {
        let returnedMovies = data;
        this.setState(prevState => {
          let newMovies = returnedMovies.slice(0, 25);
          let movies = Object.assign({}, prevState);
          movies.movies = newMovies;
          return movies;
        });
      })
      .catch(err => {
        console.log("client error", err);
      });
  }

  saveMovie(event) {
    // same as above but do something diff
    for (let movie of this.state.movies) {
      if (movie.id === Number(event.target.id)) {
        axios
          .post(`/movies/save`, movie)
          .then(data => {
            this.setState(prevState => {
              let newState = Object.assign({}, prevState);
              newState.favorites.push(movie);
              return newState;
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  deleteMovie(event) {
    // same as above but do something diff
    for (let movie of this.state.favorites) {
      if (movie.id === Number(event.target.id)) {
        axios
          .delete("/movies/delete", { data: { id: movie.id } })
          .then(data => {
            this.getFavs();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  getGenres() {
    axios.get("/movies/genres").then(({ data }) => {
      this.setState(prevState => {
        let genres = Object.assign({}, prevState);
        genres.genres = data;
        return genres;
      });
    });
  }

  getFavs() {
    axios.get("/movies/favs").then(({ data }) => {
      this.setState(prevState => {
        let newFaves = data.slice(0, 25);
        let favorites = Object.assign({}, prevState);
        favorites.favorites = newFaves;
        return favorites;
      });
    });
  }

  swapFavorites(event) {
    //dont touch
    let renderValue;
    if (event.target.value === "Home") {
      renderValue = false;
    } else if (event.target.value === "Favs") {
      renderValue = true;
    }
    this.setState({
      showFaves: renderValue
    });
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
          <Nav onClick={this.swapFavorites} />
        </header>
        <div className="main">{this.state.showFaves ? <Favs favs={this.state.favorites} genres={this.state.genres} deleteMovie={this.deleteMovie} /> : <Movies movies={this.state.movies} saveMovie={this.saveMovie} genres={this.state.genres} getMovies={this.getMovies} />}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
