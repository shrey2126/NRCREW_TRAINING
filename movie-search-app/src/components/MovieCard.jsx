const MovieCard = ({ movie, isFavorite, toggleFavorite, onMovieClick, index }) => {
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div
      onClick={() => onMovieClick(movie.imdbID)}
      className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.Title}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 hover:scale-110 active:scale-95 z-10"
        >
          <svg
            className={`w-6 h-6 transition-colors duration-300 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-white'
            }`}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-amber-500 transition-colors duration-300">
          {movie.Title}
        </h3>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full">
            {movie.Year}
          </span>
          <span className="capitalize">{movie.Type}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
