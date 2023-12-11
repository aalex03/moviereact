import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';

function NavigationBar({ user }) {
  return (
    <Navbar bg="light" expand="lg" fixed='top' style={{ padding: '10px' }}>
      <Navbar.Brand href="#home">MovieReact</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavLink to={'/shows'} className='nav-link'>Shows</NavLink>
          {user && (
            <NavLink to={'/showlist'} className='nav-link'>My list</NavLink>
          )}
          {user && user.isAdmin && (
            <NavLink to={'/admin'} className='nav-link'>Admin</NavLink>
          )}
        </Nav>
        <Nav className='ms-auto'>
          <Form className='ms-2 me-2'>
            <FormControl inline type="text" placeholder="Search" className="m-2" />
          </Form>
          <div className='ms-2 me-2'>
            {user ? (
              <div>
                <small className='ms-2 me-2'>{user.email}</small>
                <Logout />
              </div>
            ) : (
              <Login />
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;