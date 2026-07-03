import { useRef } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';

const MyNavbar = ({ setSearchQuery, viewMode, setViewMode }) => {
  const inputRef = useRef(null);

  const resetSearch = () => {
    if (inputRef.current) inputRef.current.value = "";
    setSearchQuery("");
  };

  const handleSearchSubmit = () => {
    if (inputRef.current) {
      const value = inputRef.current.value.trim();
      setSearchQuery(value); 
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand 
          href="javascript:void(0)" 
          onClick={resetSearch} 
          className="brand-effect"
          style={{ color: 'red', fontWeight: 'bold' }}
        >
          NETFLIX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="javascript:void(0)" onClick={resetSearch}>Home</Nav.Link>
            <Nav.Link href="javascript:void(0)" onClick={resetSearch} active>TV Shows</Nav.Link>
            <Nav.Link href="javascript:void(0)" onClick={resetSearch}>Movies</Nav.Link>
            <Nav.Link href="javascript:void(0)" onClick={resetSearch}>Recently Added</Nav.Link>
            <Nav.Link href="javascript:void(0)" onClick={resetSearch}>My List</Nav.Link>
          </Nav>
          <Nav className="align-items-center gap-2">
            <Form.Control
              ref={inputRef}
              type="search"
              placeholder="Cerca e premi invio o la lente"
              className="me-2 bg-dark text-white border-secondary search-input"
              onChange={(e) => {
                if (e.target.value.trim() === '') setSearchQuery("");
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
            <Nav.Link href="javascript:void(0)" onClick={handleSearchSubmit} className="nav-icon-effect">
              <i className="bi bi-search"></i>
            </Nav.Link>
            <Nav.Link href="javascript:void(0)" className="fw-bold">KIDS</Nav.Link>
            <Nav.Link href="javascript:void(0)" className="nav-icon-effect"><i className="bi bi-bell-fill"></i></Nav.Link>
            
            <div className="d-flex gap-1 mx-2 align-items-center">
              <Button 
                variant="dark" 
                onClick={() => setViewMode('grid')}
                className={`p-0 d-flex align-items-center justify-content-center border-secondary ${viewMode === 'grid' ? 'bg-secondary border-light text-white' : 'text-muted'}`}
                style={{ width: '34px', height: '34px', backgroundColor: viewMode === 'grid' ? '#2d3137' : 'transparent' }}
              >
                <i className="bi bi-grid-fill" style={{ fontSize: '0.95rem' }}></i>
              </Button>

              <Button 
                variant="dark" 
                onClick={() => setViewMode('carousel')}
                className={`p-0 d-flex align-items-center justify-content-center border-secondary ${viewMode === 'carousel' ? 'bg-secondary border-light text-white' : 'text-muted'}`}
                style={{ width: '34px', height: '34px', backgroundColor: viewMode === 'carousel' ? '#2d3137' : 'transparent' }}
              >
                <i className="bi bi-list" style={{ fontSize: '1.15rem' }}></i>
              </Button>
            </div>

            <Nav.Link href="javascript:void(0)" className="nav-icon-effect"><i className="bi bi-person-circle"></i></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;