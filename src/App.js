import { useState, useEffect } from "react";

import Movie from "./components/Movie";

import movieService from "./services/movies";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [showWatchList, setShowWatchList] = useState(false);
  useEffect(() => {
    movieService.getAll().then((movieList) => {
      setMovies(movieList);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMovie) {
      const newMovieObject = {
        title: newMovie,
        watchList: true,
        year: parseInt(releaseYear) || null,
      };
      movieService.create(newMovieObject).then((newMovie) => {
        setMovies([...movies, newMovie]);
      });
    } else {
      alert("Please enter a movie title");
    }
    setNewMovie("");
    setReleaseYear("");
  };

  const watchListUpdate = (movie) => {
    const updatedMovie = { ...movie, watchList: !movie.watchList };
    movieService
      .update(movie.id, updatedMovie)
      .then((updatedMovie) => {
        setMovies(
          movies.map((movie) =>
            movie.id === updatedMovie.id ? updatedMovie : movie
          )
        );
      })
      .catch((error) => {
        window.alert(`${movie.title} was deleted from the list of movies`);
        console.log("error", error.message);
        setMovies(movies.filter((movie) => updatedMovie.id !== movie.id));
      });
  };

  const handleChange = (e) => setNewMovie(e.target.value);

  const filteredMovies = !showWatchList
    ? movies
    : movies.filter((movie) => movie.watchList);

  return (
    <div>
      <h1>Must Watch Movies</h1>
      <button onClick={() => setShowWatchList(!showWatchList)}>
        Show {!showWatchList ? "Only the Watch List" : "All Movies"}{" "}
      </button>
      <ul>
        {filteredMovies.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            watchListUpdate={watchListUpdate}
          />
        ))}
      </ul>
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={newMovie}
          onChange={handleChange}
          placeholder="Movie Title"
        />
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          placeholder="Release Year"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
