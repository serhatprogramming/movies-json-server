import axios from "axios";

import { useState, useEffect } from "react";

import Movie from "./components/Movie";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [showWatchList, setShowWatchList] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3001/movies").then((response) => {
      setMovies(response.data);
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
      axios
        .post("http://localhost:3001/movies", newMovieObject)
        .then((response) => {
          setMovies([...movies, response.data]);
          console.log(response.data);
        });
    } else {
      alert("Please enter a movie title");
    }
    setNewMovie("");
    setReleaseYear("");
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
          <Movie key={movie.id} movie={movie} />
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
