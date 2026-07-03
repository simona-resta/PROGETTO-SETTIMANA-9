import { useEffect, useState } from 'react';
import { Row, Col, Spinner, Alert, Modal, Button, Form, Dropdown } from 'react-bootstrap';

const MovieGallery = ({ searchQuery, viewMode }) => { 
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentRating, setCommentRating] = useState('5');
  
  const [brokenImages, setBrokenImages] = useState({});

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const STRIVE_TOKEN = import.meta.env.VITE_STRIVE_API_TOKEN;
  const COMMENTS_URL = "https://striveschool-api.herokuapp.com/api/comments/";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setBrokenImages({});
        
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
        if (!response.ok) throw new Error('Errore nella fetch');

        const data = await response.json();
        if (data.Response === "True") {
          const validMovies = data.Search.filter(movie => 
            movie.Poster && 
            movie.Poster.trim() !== "" && 
            movie.Poster !== "N/A" &&
            movie.Poster.startsWith('http')
          );
          setMovies(validMovies); 
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleImageError = (movieId) => {
    setBrokenImages(prev => ({
      ...prev,
      [movieId]: true
    }));
  };

  const fetchComments = async (movieId) => {
    try {
      const response = await fetch(`${COMMENTS_URL}${movieId}`, {
        headers: {
          'Authorization': `Bearer ${STRIVE_TOKEN}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        setComments([]);
      }
    } catch (error) {
      setComments([]);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      comment: newComment,
      rate: parseInt(commentRating),
      elementId: selectedMovie.imdbID,
    };

    try {
      const response = await fetch(COMMENTS_URL, {
        method: 'POST',
        body: JSON.stringify(newCommentObj),
        headers: {
          'Authorization': `Bearer ${STRIVE_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setNewComment('');
        setCommentRating('5');
        fetchComments(selectedMovie.imdbID);
      } else {
        alert("Errore nell'invio del commento");
      }
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
    fetchComments(movie.imdbID);
  };

  const getRatingLabel = (rating) => {
    switch (rating) {
      case '1': return 'Pessimo';
      case '2': return 'Scarso';
      case '3': return 'Sufficiente';
      case '4': return 'Buono';
      case '5': return 'Ottimo';
      default: return '';
    }
  };

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-white mb-0 text-capitalize">{searchQuery}</h4>
      </div>

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
        <Row 
          className={`g-3 ${viewMode === 'carousel' ? 'flex-nowrap overflow-auto pb-3 custom-scrollbar' : ''}`}
          style={viewMode === 'carousel' ? { scrollBehavior: 'smooth' } : {}}
        >
          {movies.map((movie) => {
            if (brokenImages[movie.imdbID]) return null;

            return (
              <Col 
                key={movie.imdbID}
                xs={6} sm={4} md={3} lg={2} 
                className={viewMode === 'carousel' ? 'flex-shrink-0' : 'mb-2'}
              >
                <div className="overflow-hidden rounded animate-card" style={{ height: '300px' }}>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="img-fluid w-100 h-100 object-fit-cover"
                    style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => handleCardClick(movie)}
                    onError={() => handleImageError(movie.imdbID)}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #111; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered data-bs-theme="dark">
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title className="fw-bold">{selectedMovie?.Title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-dark text-white p-4">
          <h5 className="mb-3 text-secondary fw-semibold" style={{ fontSize: '1rem' }}>RECENSIONI DEGLI UTENTI</h5>

          <div className="mb-4 pe-1" style={{ maxHeight: '280px', overflowY: 'auto' }}>
            {comments.length === 0 ? (
              <div className="text-center py-4 text-muted border border-secondary border-dashed rounded bg-opacity-10 bg-secondary">
                <i className="bi bi-chat-left-text d-block fs-3 mb-2"></i>
                Nessuna recensione presente per questo titolo.
              </div>
            ) : (
              comments.map((c) => (
                <div 
                  key={c._id} 
                  className="mb-2 p-3 rounded" 
                  style={{ backgroundColor: '#1f2226', border: '1px solid #2d3137' }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      {[...Array(parseInt(c.rate || 0))].map((_, i) => (
                        <i key={`filled-${i}`} className="bi bi-star-fill text-warning me-1" style={{ fontSize: '0.85rem' }}></i>
                      ))}
                      {[...Array(5 - parseInt(c.rate || 0))].map((_, i) => (
                        <i key={`empty-${i}`} className="bi bi-star text-muted me-1" style={{ fontSize: '0.85rem' }}></i>
                      ))}
                    </div>
                  </div>
                  <p className="mb-0 text-white-50" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                    {c.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          <hr className="border-secondary my-4" />

          <Form onSubmit={handleCommentSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-secondary fw-semibold" style={{ fontSize: '0.85rem' }}>LASCIA UN COMMENTO</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cosa ne pensi di questo film? Scrivi qui..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-secondary bg-opacity-20 text-white border-secondary py-2"
                style={{ fontSize: '0.95rem' }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="text-secondary fw-semibold" style={{ fontSize: '0.85rem' }}>VOTO</Form.Label>
              <Dropdown onSelect={(val) => setCommentRating(val)}>
                <Dropdown.Toggle variant="dark" className="w-100 text-start d-flex justify-content-between align-items-center border-secondary py-2">
                  <span>
                    {commentRating} <i className="bi bi-star-fill text-warning ms-1 me-2"></i> — {getRatingLabel(commentRating)}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100" variant="dark">
                  <Dropdown.Item eventKey="1">1 <i className="bi bi-star-fill text-warning mx-1"></i> - Pessimo</Dropdown.Item>
                  <Dropdown.Item eventKey="2">2 <i className="bi bi-star-fill text-warning mx-1"></i> - Scarso</Dropdown.Item>
                  <Dropdown.Item eventKey="3">3 <i className="bi bi-star-fill text-warning mx-1"></i> - Sufficiente</Dropdown.Item>
                  <Dropdown.Item eventKey="4">4 <i className="bi bi-star-fill text-warning mx-1"></i> - Buono</Dropdown.Item>
                  <Dropdown.Item eventKey="5">5 <i className="bi bi-star-fill text-warning mx-1"></i> - Ottimo</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Button variant="danger" type="submit" className="w-100 fw-bold py-2 border-0" style={{ backgroundColor: '#E50914' }}>
              Invia Commento
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MovieGallery;