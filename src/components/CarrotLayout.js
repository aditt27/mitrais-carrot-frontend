import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import RoleNavbar from './RoleNavbar'

class CarrotLayout extends React.Component {

    render() {

        const containerStyle = {
            backgroundColor: '#ECF0F5'
        }

        const titleStyle = {
            marginTop: '1em',
            marginBottom: '0.8em',
            color: '#838e9b',
            fontFamily: 'Verdana',
            textTransform: 'uppercase'
        }

        const contentStyle = {
            backgroundColor: 'white',
            borderRadius: '8px'
        }

        return (
            <div style={containerStyle}>
                <MainNavbar />
                <Container>
                    <h2 style={titleStyle}>{this.props.title}</h2>
                    <RoleNavbar role={this.props.role} />
                    <div className='my-3' style={contentStyle}>
                        <Outlet />
                    </div> 
                </Container>
                <footer className='text-center py-3'> 
                    <small>Mitrais FG 2022 Team 3</small>
                </footer>  
            </div>
        )
    }
}

export default CarrotLayout