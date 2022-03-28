import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RoleNavbar = (props)=> {

    const [activeKey, setActiveKey] = useState(1)

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

    const handleSelect = (eventKey) => setActiveKey(eventKey);

    return(
        <Nav variant='pills' as='ul' activeKey={activeKey} onSelect={handleSelect}>
            {
                roleNavbarItems.map(item=> {
                    if(item.active) {
                        return <Nav.Item as='li' style={roleNavbarStyle} key={item.key}>
                            <Nav.Link className='active' as={Link} to={item.href} eventKey={item.key}>{item.name}</Nav.Link>
                        </Nav.Item>
                    } else {
                        return <Nav.Item as='li' style={roleNavbarStyle} key={item.key}>
                            <Nav.Link as={Link} to={item.href} eventKey={item.key}>{item.name}</Nav.Link>
                        </Nav.Item>
                    }
                                      
                })
            }
        </Nav>
    )
}
export default RoleNavbar