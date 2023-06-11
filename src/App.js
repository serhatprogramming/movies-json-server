import { useState, useEffect } from "react";

import Movie from "./components/Movie";

import movieService from "./services/movies";

import Notification from "./components/Notification";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [showWatchList, setShowWatchList] = useState(false);
  const [notification, setNotification] = useState(null);
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
      notify("warning", `${newMovieObject.title} added successfully`);
    } else {
      notify("error", "Please enter a movie title");
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
        notify(
          "warning",
          `${updatedMovie.title} was ${
            updatedMovie.watchList ? "added to" : "removed from"
          } the watch list`
        );
      })
      .catch((error) => {
        notify(
          "error",
          `${movie.title} was already deleted from the list of movies`
        );
        setMovies(movies.filter((movie) => updatedMovie.id !== movie.id));
      });
  };

  const handleChange = (e) => setNewMovie(e.target.value);

  const filteredMovies = !showWatchList
    ? movies
    : movies.filter((movie) => movie.watchList);

  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div>
      <h1>Must Watch Movies</h1>
      <Notification notification={notification} />
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
