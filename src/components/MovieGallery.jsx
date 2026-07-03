import { useEffect, useState } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';

const MovieGallery = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY; 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
        
        if (!response.ok) {
          throw new Error('Errore nella fetch');
        }

        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search); 
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("Errore:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]); 

  return (
    <div className="mb-5">
      <h4 className="text-white mb-3">{searchQuery}</h4>
      
      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" variant="light" />
        </div>
      )}

      {isError && (
        <Alert variant="danger">
          Errore nel caricamento dei film per: {searchQuery}
        </Alert>
      )}

      {!isLoading && !isError && (
        <Row className="flex-nowrap overflow-auto pb-3">
          {movies.slice(0, 6).map((movie) => (
            <Col xs={6} md={4} lg={2} key={movie.imdbID} className="mb-2">
              <img 
                src={movie.Poster} 
                alt={movie.Title} 
                className="img-fluid object-fit-cover" 
                style={{ height: '300px', width: '100%' }}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MovieGallery;