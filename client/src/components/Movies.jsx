import React from "react";
import MovieEntry from "./MovieEntry.jsx";

class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  onSelect(event) {
    let id = event.target.options[event.target.selectedIndex].id;
    this.props.getMovies(id);
  }

  render() {
    return (
      <div>
        <div className="search">
          <br />
          <select
            onChange={event => {
              this.onSelect(event);
            }}
          >
            <option>{"Select a Genre"}</option>
            {this.props.genres.map(genre => {
              return (
                <option key={genre.id} id={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
          <br />
          <br />
        </div>
        <ul className="movies">
          {this.props.movies.map(movie => {
            return <MovieEntry newMovie={movie} clickHandler={this.props.saveMovie} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Movies;
