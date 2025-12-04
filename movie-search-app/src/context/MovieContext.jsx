import { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within MovieProvider');
  }
  return context;
};

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchState, setSearchState] = useState({
    movies: [],
    searchTerm: 'movie',
    loading: false,
    filters: { type: '', year: '' },
    currentPage: 1,
    totalResults: 0,
    loadingMore: false
  });

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    searchMovies('movie', { type: '', year: '' }, 1);
  }, []);

  const searchMovies = async (query, filterOptions, page = 1, append = false) => {
    if (!query?.trim()) return;
    
    setSearchState(prev => ({
      ...prev,
      loading: !append,
      loadingMore: append
    }));
    
    try {
      let url = `${API_URL}&s=${encodeURIComponent(query)}&page=${page}`;
      
      if (filterOptions?.type) {
        url += `&type=${filterOptions.type}`;
      }
      
      if (filterOptions?.year) {
        url += `&y=${filterOptions.year}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.Search && Array.isArray(data.Search)) {
        setSearchState(prev => ({
          ...prev,
          movies: append ? [...prev.movies, ...data.Search] : data.Search,
          totalResults: parseInt(data.totalResults) || 0,
          currentPage: page,
          searchTerm: query,
          filters: filterOptions,
          loading: false,
          loadingMore: false
        }));
      } else {
        setSearchState(prev => ({
          ...prev,
          movies: append ? prev.movies : [],
          totalResults: append ? prev.totalResults : 0,
          loading: false,
          loadingMore: false
        }));
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setSearchState(prev => ({
        ...prev,
        loading: false,
        loadingMore: false
      }));
    }
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

  const resetToHome = () => {
    searchMovies('movie', { type: '', year: '' }, 1, false);
  };

  const value = {
    favorites,
    searchState,
    searchMovies,
    toggleFavorite,
    isFavorite,
    resetToHome
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
