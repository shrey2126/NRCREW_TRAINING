import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import FavoritesSection from '../components/FavoritesSection';
import Hero from '../components/Hero';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useMovieContext();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-slate-800 hover:bg-slate-800/80"
          >
            All Movies
          </button>
          <button
            onClick={() => navigate('/favorites')}
            className="px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/50 scale-105 relative"
          >
            Favorites
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                {favorites.length}
              </span>
            )}
          </button>
        </div>

        <FavoritesSection
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onMovieClick={handleMovieClick}
        />
      </div>
    </div>
  );
};

export default Favorites;
