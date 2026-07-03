import { Navbar, Nav, Container } from 'react-bootstrap';

const MainLinks = () => (
  <Nav className="me-auto">
    <Nav.Link href="#home">Home</Nav.Link>
    <Nav.Link href="#tvshows" active>TV Shows</Nav.Link>
    <Nav.Link href="#movies">Movies</Nav.Link>
    <Nav.Link href="#recent">Recently Added</Nav.Link>
    <Nav.Link href="#list">My List</Nav.Link>
  </Nav>
);

const UserActions = () => (
  <Nav className="align-items-center">
    <Nav.Link href="#"><i className="bi bi-search"></i></Nav.Link>
    <Nav.Link href="#" className="fw-bold">KIDS</Nav.Link>
    <Nav.Link href="#"><i className="bi bi-bell-fill"></i></Nav.Link>
    <Nav.Link href="#"><i className="bi bi-person-circle"></i></Nav.Link>
  </Nav>
);

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home" style={{ color: 'red', fontWeight: 'bold' }}>
          NETFLIX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <MainLinks />    
          <UserActions />  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;