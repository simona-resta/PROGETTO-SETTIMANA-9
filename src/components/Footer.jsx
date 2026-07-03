import { Container, Row, Col, Button } from 'react-bootstrap';

const MyFooter = () => {
  return (
    <footer className="mt-5 pt-4 pb-4 footer-style">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            
            <div className="mb-3 d-flex gap-3 fs-4">
              <i className="bi bi-facebook" style={{ cursor: 'pointer' }}></i>
              <i className="bi bi-instagram" style={{ cursor: 'pointer' }}></i>
              <i className="bi bi-twitter" style={{ cursor: 'pointer' }}></i>
              <i className="bi bi-youtube" style={{ cursor: 'pointer' }}></i>
            </div>

            <Row className="row-cols-2 row-cols-sm-3 row-cols-md-4 mb-4" style={{ fontSize: '0.85rem' }}>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Audio and Subtitles</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Audio Description</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Help Center</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Gift Cards</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Media Center</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Investor Relations</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Jobs</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Terms of Use</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Privacy</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Legal Notices</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Cookie Preferences</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Corporate Information</a></Col>
              <Col className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#808080' }}>Contact Us</a></Col>
            </Row>

            <div className="mb-3">
              <Button 
                variant="outline-secondary" 
                size="sm" 
                className="rounded-0 text-secondary border-secondary"
              >
                Service Code
              </Button>
            </div>

            <div style={{ fontSize: '0.75rem' }}>
              © 1997-2026 Netflix, Inc.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;