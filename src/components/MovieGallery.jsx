import { useEffect, useState } from 'react';
import { Row, Col, Spinner, Alert, Modal, Button, Form, ListGroup, Dropdown } from 'react-bootstrap';

const MovieGallery = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentRating, setCommentRating] = useState('5');

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
        if (!response.ok) throw new Error('Errore nella fetch');

        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search);
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

  const fetchComments = (movieId) => {
    const storedComments = localStorage.getItem(`comments_${movieId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else {
      setComments([]);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      _id: Date.now().toString(),
      comment: newComment,
      rate: commentRating,
      elementId: selectedMovie.imdbID,
      date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    localStorage.setItem(`comments_${selectedMovie.imdbID}`, JSON.stringify(updatedComments));
    
    setNewComment('');
    setCommentRating('5');
    setShowModal(false);
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
      <h4 className="text-white mb-3 text-capitalize">{searchQuery}</h4>

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
        <Row className="g-3">
          {movies.slice(0, 6).map((movie) => (
            <Col xs={12} sm={6} md={4} lg={2} key={movie.imdbID}>
              <div className="overflow-hidden rounded" style={{ height: '300px' }}>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="img-fluid w-100 h-100 object-fit-cover"
                  style={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  onClick={() => handleCardClick(movie)}
                />
              </div>
            </Col>
          ))}
        </Row>
      )}

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
                Nessuna recensione presente per questo titolo. Lascia la prima!
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
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>{c.date || 'Oggi'}</small>
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