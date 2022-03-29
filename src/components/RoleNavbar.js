import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { Admin, Merchant, Manager, Staff } from '../utils/Role'

const RoleNavbar = (props) => {

  const [activeKey, setActiveKey] = useState(1)
  const location = useLocation()

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
    {
      key: 4,
      name: 'Group',
      href: '/admin/group'
    },
    {
      key: 5,
      name: 'Harvest',
      href: '/admin/barn'
    },
    {
      key: 6,
      name: 'Staff In Group',
      href: '/admin/staff-in-group'
    },
    {
      key: 7,
      name: 'Staff List',
      href: '/admin/staff-list'
    }
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
    {
      key: 4,
      name: 'Share Carrot',
      href: '/admin/share-carrot'
    }
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

  useEffect(() => {
    const item = roleNavbarItems.filter(item=> item.href === location.pathname)[0]
    setActiveKey(item.key)
  }, [])


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