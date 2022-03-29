import React from 'react'
import MCarrotLogo from '../assets/img/mitrais-logo.png'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                    <Nav className='mr-auto'>
                        <NavDropdown title={<FontAwesomeIcon icon="bell" />}>
                            <NavDropdown.Item> Notification 1</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Button>See All Notification</Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#guide"><FontAwesomeIcon icon="question-circle" /></Nav.Link>
                        <NavDropdown title={<FontAwesomeIcon icon="bars" />} >
                            <NavDropdown.Header>
                                <strong>Aditya Budi Laksono</strong>
                                <br />
                                Grade, Department
                            </NavDropdown.Header>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='/Logout'>
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