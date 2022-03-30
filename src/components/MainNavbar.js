import React from 'react'
import MCarrotLogo from '../assets/img/mitrais-logo.png'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { saveProfile } from '../stores/user'
import { connect } from 'react-redux'
import { getUserByUsername } from '../apis/user'

class MainNavbar extends React.Component {

    componentDidMount() {
        this.loadUserProfile()
    }

    loadUserProfile() {
        getUserByUsername(this.props.auth.sub)
            .then(result=> {
                console.log(result)
                this.props.saveUserProfile(result.result)
            })
    }
    
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
                    <Nav>
                        <NavDropdown title={<FontAwesomeIcon icon="bell" className='notif-icon' />}>
                            <NavDropdown.Item> Notification 1</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='/notification'>
                              <Button>See All Notification</Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#guide"><FontAwesomeIcon icon="question-circle" className='help-icon'/></Nav.Link>
                        <NavDropdown title={<FontAwesomeIcon icon="bars" className='menu-icon' />}>
                            <NavDropdown.Header>
                                <strong>{this.props.userProfile.name}</strong>
                                <br />
                                {this.props.userProfile.jobFamily}, {this.props.userProfile.office}
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

const mapStateToProps = (state)=> ({
    auth: state.authReducer.userData,
    userProfile: state.userReducer.profile
})

const mapDispatchToProps = (dispatch)=> ({
    saveUserProfile: (profile)=> dispatch(saveProfile({
        profile
    }))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar)