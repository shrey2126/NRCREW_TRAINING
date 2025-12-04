import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const { resetToHome } = useMovieContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    } else {
      resetToHome();
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-12 max-w-3xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for movies, series..."
          className="w-full px-6 py-4 bg-slate-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 pr-14 glass-effect"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-yellow-600 text-slate-900 p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
