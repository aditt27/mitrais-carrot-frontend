import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Admin, Merchant, Manager, Staff } from '../utils/Role'

const RoleNavbar = (props) => {

  const [activeKey, setActiveKey] = useState(1)

  const adminNavbarItems = [
    {
      key: 1,
      name: 'Dashboard',
      href: '/admin'
    },
    {
      key: 2,
      name: 'Bazaar',
      href: '/admin/bazaar'
    },
    {
      key: 3,
      name: 'Manage Bazaar',
      href: '/admin/bazaar/manage'
    },
  ]

  const merchantNavbarItems = [
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

  const managerNavbarItems = [
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

  const staffNavbarItems = [
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

  let roleNavbarItems = [];


  const roleNavbarStyle = {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    fontFamily: 'Verdana'
  }

  const handleSelect = (eventKey) => setActiveKey(eventKey);

  switch (props.role) {
    case Admin:
      roleNavbarItems = adminNavbarItems
      break;
    case Merchant:
      roleNavbarItems = merchantNavbarItems
      break;
    case Manager:
      roleNavbarItems = managerNavbarItems
      break;
    case Staff:
      roleNavbarItems = staffNavbarItems
      break;

    default:
      break;
  }


  return (
    <Nav variant='pills' as='ul' activeKey={activeKey} onSelect={handleSelect}>
      {
        roleNavbarItems.map(item => {
          if (item.active) {
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