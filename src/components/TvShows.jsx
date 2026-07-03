import MovieGallery from './MovieGallery';

const TvShows = ({ searchQuery }) => {
  const isDefaultView = 
    !searchQuery || 
    searchQuery === "Harry Potter" || 
    searchQuery === "Lord of the Rings" || 
    searchQuery === "Star Wars";

  return (
    <div className="container-fluid px-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-4">
          <h2 className="text-white mb-0">TV Shows</h2>
          <select 
            className="bg-black text-white border border-secondary px-2 py-1" 
            style={{ cursor: 'pointer', outline: 'none' }}
            defaultValue="Genres"
          >
            <option disabled>Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Comedy</option>
            <option>Sci-Fi</option>
          </select>
        </div>
        <div className="text-white fs-5 d-none d-md-block">
          <i className="bi bi-grid border border-secondary px-2 py-1 me-2" style={{ cursor: 'pointer' }}></i>
          <i className="bi bi-list border border-secondary px-2 py-1" style={{ cursor: 'pointer' }}></i>
        </div>
      </div>

      {isDefaultView ? (
        <>
          <MovieGallery searchQuery="Harry Potter" />
          <MovieGallery searchQuery="Lord of the Rings" />
          <MovieGallery searchQuery="Star Wars" />
        </>
      ) : (
        <MovieGallery searchQuery={searchQuery} />
      )}
    </div>
  );
};

export default TvShows;