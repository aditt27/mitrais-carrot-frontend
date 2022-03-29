import React from 'react'
import MCarrotLogo from '../assets/img/mitrais-logo.png'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

class MainNavbar extends React.Component {
    
    render() {

        const navbarStyle = {
            borderBottom : '1px solid #d9d9d9'
        }

        return(
            <Navbar bg="light" expand="lg" style={navbarStyle}>
                <Navbar.Brand href="#home"> 
                    <img 
                        src={MCarrotLogo}
                        alt='Mitrais Carrot Logo'
                    />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className='ml-auto'>
                        <NavDropdown title={<FontAwesomeIcon icon="bell" className='notif-icon' />}>
                            <NavDropdown.Item> Notification 1</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link to='/notification'>
                                  <Button>See All Notification</Button>
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#guide"><FontAwesomeIcon icon="question-circle" className='help-icon'/></Nav.Link>
                        <NavDropdown title={<FontAwesomeIcon icon="bars" className='menu-icon' />}>
                            <NavDropdown.Header>
                                <strong>Aditya Budi Laksono</strong>
                                <br />
                                Grade, Department
                            </NavDropdown.Header>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='/change-password'>
                              <FontAwesomeIcon icon="key" className='mr-1'/>
                              Change Password
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='/logout'>
                              <FontAwesomeIcon icon="sign-out" className='mr-1'/>
                              Logout
                            </NavDropdown.Item>
                                
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default MainNavbar