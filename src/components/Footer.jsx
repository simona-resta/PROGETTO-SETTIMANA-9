import { Container, Row, Col, Button } from 'react-bootstrap';

const MyFooter = () => {
  return (
    <footer className="mt-5 pt-4 pb-4 footer-style">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            
            <div className="mb-3 d-flex gap-3 fs-4">
              <i className="bi bi-facebook social-icon"></i>
              <i className="bi bi-instagram social-icon"></i>
              <i className="bi bi-twitter social-icon"></i>
              <i className="bi bi-youtube social-icon"></i>
            </div>

            <Row className="row-cols-2 row-cols-sm-3 row-cols-md-4 mb-4" style={{ fontSize: '0.85rem' }}>
              <Col className="mb-2"><a href="#" className="footer-link">Audio and Subtitles</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Audio Description</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Help Center</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Gift Cards</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Media Center</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Investor Relations</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Jobs</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Terms of Use</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Privacy</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Legal Notices</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Cookie Preferences</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Corporate Information</a></Col>
              <Col className="mb-2"><a href="#" className="footer-link">Contact Us</a></Col>
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