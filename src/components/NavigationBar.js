import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';

function NavigationBar({ userProfile }) {
  return (
    <Navbar bg="dark" expand="lg" fixed='top' style={{ padding: '10px' }}>
      <Navbar.Brand href="#home">MovieReact</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavLink to={'/shows'} className='nav-link'>Shows</NavLink>
          {userProfile && (
            <NavLink to={'/showlist'} className='nav-link'>My list</NavLink>
          )}
          
        </Nav>
        <Nav className='ms-auto'>
        {userProfile && userProfile.isAdmin && (
            <NavLink to={'/admin'} className='nav-link'>Admin</NavLink>
          )}
          <Form className='ms-2 me-2'>
            <FormControl inline type="text" placeholder="Search" className="m-2" />
          </Form>
          <div className='ms-2 me-2'>
            {userProfile ? (
              <div>
                <small className='ms-2 me-2'>{userProfile.Username}</small>
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