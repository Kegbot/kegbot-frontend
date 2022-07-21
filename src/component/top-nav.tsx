import { useContext } from 'react';

import { Col, Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import CurrentUserContext from './current-user-context';

export default function TopNav() {
  const { currentUser, isLoggedIn, logout } = useContext(CurrentUserContext);
  const rightMenu = isLoggedIn ? (
    <NavDropdown title={currentUser.username}>
      <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
    </NavDropdown>
  ) : (
    <Nav.Link>Log in</Nav.Link>
  );

  return (
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
            <Navbar.Collapse role="login">
              <Nav className="justify-content-end" style={{ width: '100%' }}>
                {rightMenu}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
}
