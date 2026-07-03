import { useState } from 'react';
import MovieGallery from './MovieGallery';

const TvShows = ({ searchQuery, viewMode }) => {
  const [selectedGenre, setSelectedGenre] = useState("Genres");

  const genreConfig = {
    Genres: ["Harry Potter", "Lord of the Rings", "Star Wars"],
    Action: ["Marvel", "John Wick", "Fast and Furious"],
    Drama: ["The Godfather", "Breaking Bad", "Chernobyl"],
    Comedy: ["Friends", "The Office", "Shrek"],
    SciFi: ["Matrix", "Interstellar", "Stranger Things"]
  };

  const isDefaultView = !searchQuery || searchQuery.trim() === "";
  const currentQueries = genreConfig[selectedGenre] || genreConfig["Genres"];

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-4">
          <h2 className="text-white mb-0">TV Shows</h2>
          <select 
            className="bg-black text-white border border-secondary px-2 py-1" 
            style={{ cursor: 'pointer', outline: 'none' }}
            value={isDefaultView ? selectedGenre : "Genres"} 
            onChange={(e) => setSelectedGenre(e.target.value)}
            disabled={!isDefaultView} 
          >
            <option value="Genres">All Genres</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="SciFi">Sci-Fi</option>
          </select>
        </div>
      </div>

      {isDefaultView ? (
        <>
          {currentQueries.map((query) => (
            <MovieGallery key={query} searchQuery={query} viewMode={viewMode} />
          ))}
        </>
      ) : (
        <MovieGallery searchQuery={searchQuery} viewMode={viewMode} />
      )}
    </div>
  );
};

export default TvShows;