import { useParams, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import MovieDetails from '../components/MovieDetails';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, resetToHome } = useMovieContext();

  const handleClose = () => {
    navigate(-1);
  };

  const handleBackToHome = () => {
    resetToHome();
    navigate('/');
  };

  return (
    <MovieDetails
      movieId={id}
      onClose={handleClose}
      onBackToHome={handleBackToHome}
      isFavorite={isFavorite(id)}
      toggleFavorite={toggleFavorite}
    />
  );
};

export default MovieDetailsPage;
