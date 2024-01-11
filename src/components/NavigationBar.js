import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';

function NavigationBar({ userProfile }) {
  return (
    <Navbar bg="dark" expand="lg" fixed='top' style={{ padding: '10px', backgroundColor: '#1d2026', }}>
      <Navbar.Brand style={{color:'white'}} href="#home">MovieReact</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='me-auto'>
          <NavLink style={{color:'white'}} to={'/shows'} className='nav-link'>Shows</NavLink>
          {userProfile && (
            <NavLink style={{color:'white'}} to={'/showlist'} className='nav-link'>My List</NavLink>
          )}
          {userProfile && userProfile.isAdmin && (
            <NavLink style={{color:'white'}} to={'/admin'} className='nav-link'>Admin</NavLink>
          )}
        </Nav>
        <Nav className='ms-auto'>
          <Form className='ms-2 me-2'>
            <FormControl 
          
              className="red-placeholder"
              inline
              type="text"
              placeholder="Search"
              style={{ backgroundColor: '#282c34', color: 'white', }}
            />
          </Form>
          <div className='ms-2 me-2'>
            {userProfile ? (
              <div className='d-flex align-items-center'>
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