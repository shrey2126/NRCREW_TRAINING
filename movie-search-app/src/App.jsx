import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import FavoritesSection from './components/FavoritesSection';
import Hero from './components/Hero';
import MovieDetails from './components/MovieDetails';
import FilterBar from './components/FilterBar';

const API_KEY = 'f89dd98d'; // OMDB API key
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('movie');
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filters, setFilters] = useState({ type: '', year: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    // eslint-disable-next-line react-hooks/immutability
    searchMovies(searchTerm, filters, 1);
  }, []);

  const searchMovies = async (query, filterOptions = filters, page = 1, append = false) => {
    if (!query.trim()) return;
    
    if (!append) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      let url = `${API_URL}&s=${query}&page=${page}`;
      
      if (filterOptions.type) {
        url += `&type=${filterOptions.type}`;
      }
      
      if (filterOptions.year) {
        url += `&y=${filterOptions.year}`;
      }
      
      console.log('Fetching:', url);
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data);
      
      if (data.Search) {
        if (append) {
          setMovies(prev => [...prev, ...data.Search]);
        } else {
          setMovies(data.Search);
        }
        setTotalResults(parseInt(data.totalResults) || 0);
        setCurrentPage(page);
      } else {
        if (!append) {
          setMovies([]);
          setTotalResults(0);
        }
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    
    setLoading(false);
    setLoadingMore(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    searchMovies(term, filters, 1, false);
    setShowFavorites(false);
  };

  const handleFilterChange = (newFilters) => {
    console.log('Filter changed:', newFilters);
    setFilters(newFilters);
    setCurrentPage(1);
    searchMovies(searchTerm, newFilters, 1, false);
  };

  const loadMoreMovies = () => {
    const nextPage = currentPage + 1;
    searchMovies(searchTerm, filters, nextPage, true);
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.imdbID === movieId);
  };

  const handleMovieClick = (movieId) => {
    console.log('Movie clicked:', movieId);
    setSelectedMovie(movieId);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        
        {!showFavorites && (
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        )}
        
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setShowFavorites(false)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              !showFavorites
                ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/50 scale-105'
                : 'bg-slate-800 hover:bg-slate-800/80'
            }`}
          >
            All Movies
          </button>
          <button
            onClick={() => setShowFavorites(true)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 relative ${
              showFavorites
                ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/50 scale-105'
                : 'bg-slate-800 hover:bg-slate-800/80'
            }`}
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

        {!loading && showFavorites && (
          <FavoritesSection
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onMovieClick={handleMovieClick}
          />
        )}

        {!loading && !showFavorites && movies.length > 0 && (
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

        {!loading && !showFavorites && movies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No movies found. Try another search!</p>
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieDetails
          movieId={selectedMovie}
          onClose={() => {
            console.log('Closing modal');
            setSelectedMovie(null);
          }}
          isFavorite={isFavorite(selectedMovie)}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default App;
