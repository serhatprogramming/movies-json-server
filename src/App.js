import axios from "axios";

import { useState, useEffect } from "react";

import Movie from "./components/Movie";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");
  const [showWatchList, setShowWatchList] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3001/movies").then((response) => {
      setMovies(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovieObject = {
      title: newMovie,
      watchList: true,
      id: Date.now(),
    };
    setMovies([...movies, newMovieObject]);
    setNewMovie("");
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
        <input value={newMovie} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
