const Movie = ({ movie }) => (
  <li>
    {movie.title} {movie?.year && `(${movie.year})`}
  </li>
);

export default Movie;
