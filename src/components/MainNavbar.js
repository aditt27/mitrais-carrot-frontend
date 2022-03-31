import React from 'react'
import MCarrotLogo from '../assets/img/mitrais-logo.png'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { saveProfile } from '../stores/user'
import { connect } from 'react-redux'
import { getNotificationByUserId, getUserByUsername } from '../apis/user'
import { Link } from 'react-router-dom'

class MainNavbar extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            notifData: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.username !== this.props.username) {
            this.loadUserProfile()
            this.loadNotification()
        }
    }

    componentDidMount() {
        if(this.props.username) {
            this.loadUserProfile()
            this.loadNotification()
        }
    }

    loadUserProfile() {
        getUserByUsername(this.props.username)
            .then(result=> {
                console.log('mainnavbar profile', result)
                this.props.saveUserProfile(result.result)
            })
    }

    loadNotification() {
        getNotificationByUserId(
            true,
            0,
            5,
            this.props.userId
        ).then(result=> {
            console.log('mainnavbar notif', result)
            this.setState({notifData: result.result.currentPageContent})
        })
    }
    
    render() {

        const { notifData } = this.state

        const navbarStyle = {
            borderBottom : '1px solid #d9d9d9'
        }

        let notificationItem
        if(notifData.length > 0) {
            notificationItem = notifData.map(item=> {
                return <div key={item.id}>
                    <NavDropdown.Item>{item.subject}</NavDropdown.Item>
                    <NavDropdown.Divider />
                </div>
            })
        } else {
            notificationItem = <div key='1'>
                <NavDropdown.Item>Notification Empty</NavDropdown.Item>
                <NavDropdown.Divider />
            </div>
        }

        const location = window.location
        const path  = location.pathname.split('/')

        return(
            <Navbar bg="light" expand="lg" style={navbarStyle}>
                <Navbar.Brand href={`${location.protocol}//${location.host}`}> 
                    <img 
                        src={MCarrotLogo}
                        alt='Mitrais Carrot Logo'
                    />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown title={<FontAwesomeIcon icon="bell" className='notif-icon' />}>
                            {notificationItem}
                            
                            <NavDropdown.Item as={Link} to='notification'>
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
    username: state.authReducer.userData.sub,
    userId: state.authReducer.userData.id,
    userProfile: state.userReducer.profile
})

const mapDispatchToProps = (dispatch)=> ({
    saveUserProfile: (profile)=> dispatch(saveProfile({
        profile
    }))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar)