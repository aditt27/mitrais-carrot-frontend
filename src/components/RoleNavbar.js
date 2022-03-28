import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const RoleNavbar = (props)=> {

    const location = useLocation()

    const roleNavbarItems = [ 
        {
            key: 1,
            name: 'Dashboard',
            href: '/'
        },
        {
            key: 2,
            name: 'Bazaar',
            href: '/bazaar'
        },
        {
            key: 3,
            name: 'Assign Role',
            href: '#assignrole'
        },
    ]

    const roleNavbarStyle = {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '0.8rem',
        fontFamily: 'Verdana'
    }

    return(
        <Nav variant='pills' as='ul' defaultActiveKey={location.pathname}>
            {
                roleNavbarItems.map(item=> {
                    return <Nav.Item as='li' style={roleNavbarStyle} key={item.key}>
                        <Nav.Link as={Link} to={item.href}>{item.name}</Nav.Link>
                    </Nav.Item>                  
                })
            }
        </Nav>
    )
}
export default RoleNavbar