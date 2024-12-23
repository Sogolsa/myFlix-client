import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar expand='lg' sticky='top' className='nav-color'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='nav-brand'>
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {user ? (
              // User is logged in
              <>
                <Nav.Link as={Link} to='/' className='nav-item'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to='/profile' className='nav-item'>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className='nav-item'>
                  Logout
                </Nav.Link>
              </>
            ) : (
              // User is not logged in
              <>
                <Nav.Link as={Link} to='/login' className='nav-item'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/signup' className='nav-item'>
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
