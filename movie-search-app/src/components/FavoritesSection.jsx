import { useState } from 'react';
import MovieCard from './MovieCard';

const FavoritesSection = ({ favorites, toggleFavorite, onMovieClick }) => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterType, setFilterType] = useState('');

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4 animate-bounce">💔</div>
        <h2 className="text-3xl font-bold mb-2 gradient-text">No Favorites Yet</h2>
        <p className="text-gray-400 text-lg">Start adding movies to your favorites!</p>
      </div>
    );
  }

  const filteredFavorites = filterType
    ? favorites.filter(movie => movie.Type === filterType)
    : favorites;

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    if (sortBy === 'title') {
      return a.Title.localeCompare(b.Title);
    } else if (sortBy === 'year') {
      return b.Year.localeCompare(a.Year);
    }
    return 0;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold gradient-text">
          ❤️ Your Favorites ({filteredFavorites.length})
        </h2>
        
        <div className="flex gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-slate-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 cursor-pointer hover:bg-slate-700 text-sm"
          >
            <option value="">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
            <option value="episode">Episodes</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-slate-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 cursor-pointer hover:bg-slate-700 text-sm"
          >
            <option value="recent">Recently Added</option>
            <option value="title">Title (A-Z)</option>
            <option value="year">Year (Newest)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {sortedFavorites.map((movie, index) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={true}
            toggleFavorite={toggleFavorite}
            onMovieClick={onMovieClick}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesSection;
