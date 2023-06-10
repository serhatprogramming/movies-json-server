const Movie = ({ movie, watchListUpdate }) => {
  return (
    <li>
      {movie.title} {movie?.year && `(${movie.year})`}{" "}
      <button
        className={`watch-list-button ${movie.watchList ? "remove" : "add"}`}
        onClick={() => watchListUpdate(movie)}
      >
        {movie.watchList ? "- Remove from Watchlist" : "+ Add to Watchlist"}
      </button>
    </li>
  );
};

export default Movie;
