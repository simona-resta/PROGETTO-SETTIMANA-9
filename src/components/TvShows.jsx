import MovieGallery from './MovieGallery';

const TvShows = () => {
  return (
    <div className="container-fluid px-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">TV Shows</h2>
        
      </div>

      <MovieGallery searchQuery="Harry Potter" />
      <MovieGallery searchQuery="Lord of the Rings" />
      <MovieGallery searchQuery="Star Wars" />
      
    </div>
  );
};

export default TvShows;