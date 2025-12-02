import { useEffect, useState } from 'react';

const API_KEY = 'f89dd98d';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const MovieDetails = ({ movieId, onClose, isFavorite, toggleFavorite }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        console.log('Fetching details for movie ID:', movieId);
        const response = await fetch(`${API_URL}&i=${movieId}&plot=full`);
        const data = await response.json();
        console.log('Movie details:', data);
        setDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
      setLoading(false);
    };

    if (movieId) {
      fetchDetails();
    }
  }, [movieId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500"></div>
      </div>
    );
  }

  if (!details) return null;

  const posterUrl = details.Poster !== 'N/A' 
    ? details.Poster 
    : 'https://via.placeholder.com/400x600?text=No+Poster';

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-effect animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="md:flex">
            <div className="md:w-2/5 relative">
              <img
                src={posterUrl}
                alt={details.Title}
                className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent md:bg-gradient-to-r"></div>
            </div>

            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                    {details.Title}
                  </h2>
                  <p className="text-gray-400 text-lg">{details.Year}</p>
                </div>
                <button
                  onClick={() => toggleFavorite({ 
                    imdbID: details.imdbID, 
                    Title: details.Title, 
                    Year: details.Year, 
                    Poster: details.Poster,
                    Type: details.Type 
                  })}
                  className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <svg
                    className={`w-7 h-7 transition-colors duration-300 ${
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

              <div className="flex flex-wrap gap-2 mb-6">
                {details.Genre && details.Genre.split(', ').map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {details.Runtime && (
                  <div>
                    <p className="text-gray-400 text-sm">Runtime</p>
                    <p className="font-semibold">{details.Runtime}</p>
                  </div>
                )}
                {details.imdbRating && details.imdbRating !== 'N/A' && (
                  <div>
                    <p className="text-gray-400 text-sm">IMDB Rating</p>
                    <p className="font-semibold flex items-center">
                      ⭐ {details.imdbRating}/10
                    </p>
                  </div>
                )}
                {details.Rated && details.Rated !== 'N/A' && (
                  <div>
                    <p className="text-gray-400 text-sm">Rated</p>
                    <p className="font-semibold">{details.Rated}</p>
                  </div>
                )}
                {details.Language && (
                  <div>
                    <p className="text-gray-400 text-sm">Language</p>
                    <p className="font-semibold">{details.Language}</p>
                  </div>
                )}
              </div>

              {details.Plot && details.Plot !== 'N/A' && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2 text-amber-500">Plot</h3>
                  <p className="text-gray-300 leading-relaxed">{details.Plot}</p>
                </div>
              )}

              {details.Director && details.Director !== 'N/A' && (
                <div className="mb-4">
                  <p className="text-gray-400 text-sm">Director</p>
                  <p className="font-semibold">{details.Director}</p>
                </div>
              )}

              {details.Actors && details.Actors !== 'N/A' && (
                <div className="mb-4">
                  <p className="text-gray-400 text-sm">Cast</p>
                  <p className="font-semibold">{details.Actors}</p>
                </div>
              )}

              {details.Awards && details.Awards !== 'N/A' && (
                <div className="mt-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <p className="text-amber-500 font-semibold">🏆 {details.Awards}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
