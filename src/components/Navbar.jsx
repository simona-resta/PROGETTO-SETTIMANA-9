import { Navbar, Nav, Container, Form } from 'react-bootstrap';

const MyNavbar = ({ setSearchQuery }) => {
  const resetSearch = () => setSearchQuery("");

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand 
          href="javascript:void(0)" 
          onClick={resetSearch} 
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
          <Nav className="align-items-center">
            <Form.Control
              type="search"
              placeholder="Cerca e premi invio"
              className="me-2 bg-dark text-white border-secondary"
              onChange={(e) => {
                if (e.target.value.trim() === '') resetSearch();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                  setSearchQuery(e.target.value);
                }
              }}
            />
            <Nav.Link href="javascript:void(0)"><i className="bi bi-search"></i></Nav.Link>
            <Nav.Link href="javascript:void(0)" className="fw-bold">KIDS</Nav.Link>
            <Nav.Link href="javascript:void(0)"><i className="bi bi-bell-fill"></i></Nav.Link>
            <Nav.Link href="javascript:void(0)"><i className="bi bi-person-circle"></i></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;