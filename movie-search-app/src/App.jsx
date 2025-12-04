import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetailsPage from './pages/MovieDetailsPage';

function App() {
  return (
    <Router>
      <MovieProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </MovieProvider>
    </Router>
  );
}

export default App;
