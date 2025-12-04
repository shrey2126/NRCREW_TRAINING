import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import FilterBar from '../components/FilterBar';
import Hero from '../components/Hero';

const Home = () => {
  const navigate = useNavigate();
  const { searchState, searchMovies, toggleFavorite, isFavorite, favorites, resetToHome } = useMovieContext();
  const { movies, loading, filters, currentPage, totalResults, loadingMore, searchTerm } = searchState;

  const handleSearch = (term) => {
    searchMovies(term, filters, 1, false);
  };

  const handleFilterChange = (newFilters) => {
    searchMovies(searchTerm, newFilters, 1, false);
  };

  const loadMoreMovies = () => {
    searchMovies(searchTerm, filters, currentPage + 1, true);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const isSearchActive = searchTerm !== 'movie' || filters.type !== '' || filters.year !== '';

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        
        {isSearchActive && (
          <div className="flex justify-center mb-6">
            <button
              onClick={resetToHome}
              className="px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </button>
          </div>
        )}
        
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/50 scale-105"
          >
            All Movies
          </button>
          <button
            onClick={() => navigate('/favorites')}
            className="px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-slate-800 hover:bg-slate-800/80 relative"
          >
            Favorites
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                {favorites.length}
              </span>
            )}
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500"></div>
          </div>
        )}

        {!loading && movies && movies.length > 0 && (
          <>
            <div className="mb-6 text-center">
              <p className="text-gray-400">
                Showing {movies.length} of {totalResults} results
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie, index) => (
                <MovieCard
                  key={`${movie.imdbID}-${index}`}
                  movie={movie}
                  isFavorite={isFavorite(movie.imdbID)}
                  toggleFavorite={toggleFavorite}
                  onMovieClick={handleMovieClick}
                  index={index}
                />
              ))}
            </div>

            {movies.length < totalResults && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMoreMovies}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-slate-900"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {!loading && movies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No movies found. Try another search!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
