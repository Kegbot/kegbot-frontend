import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeView = () => {
  return <h1>Hello, world!</h1>;
};

const KegsView = () => {
  return <h1>Kegs!</h1>;
};

export function App() {
  return (
    <BrowserRouter>
      <Container fluid>
        <Row>
          <Navbar expand="lg" variant="dark" bg="dark">
            <Container>
              <Navbar.Brand href="#">Kegbot</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse role="nav">
                <Nav className="me-auto">
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/kegs">
                    <Nav.Link>Kegs</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
      </Container>
      <main>
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/kegs" element={<KegsView />} />
                <Route path="/" element={<HomeView />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </main>
    </BrowserRouter>
  );
}
