import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { Admin, Merchant, Manager, Staff } from '../utils/Role'

const RoleNavbar = (props) => {

  const [activeKey, setActiveKey] = useState(1)
  const location = useLocation()

  const adminNavbarItems = [
    {
      key: 'Bazaar',
      name: 'Bazaar',
      href: '/admin'
    },
    {
      key: 'Group',
      name: 'Group',
      href: '/admin/group'
    },
    {
      key: 'Harvest',
      name: 'Harvest',
      href: '/admin/barn'
    },
    {
      key: 'Distribution',
      name: 'Distribution',
      href: '/admin/distribution'
    },
    {
      key: 'StaffInGroup',
      name: 'Staff In Group',
      href: '/admin/staff-in-group'
    },
    {
      key: 'StaffList',
      name: 'Staff List',
      href: '/admin/staff-list'
    },
    {
      key: 'Setting',
      name: 'Setting',
      href: '/admin/setting'
    }
  ]

  const merchantNavbarItems = [
    {
      key: 'ManageBazaar',
      name: 'Manage Bazaar',
      href: '/merchant'
    },
    {
      key: 'PendingExchange',
      name: 'Pending Exchange',
      href: '/merchant/bazaar/pending'
    },
    {
      key: 'BazaarClaimed',
      name: 'Bazaar Claimed',
      href: '/merchant/bazaar/claimed'
    },
  ]

  const managerNavbarItems = [
    {
      key: 'Bazaar',
      name: 'Bazaar',
      href: '/manager'
    },
    {
      key: 'ShareCarrot',
      name: 'Share Carrot',
      href: '/manager/share-carrot'
    }
  ]

  const staffNavbarItems = [
    {
      key: 'Bazaar',
      name: 'Bazaar',
      href: '/staff'
    },
  ]

  let roleNavbarItems = [];

  const roleNavbarStyle = {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    fontFamily: 'Verdana'
  }

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
    if(item) {
      setActiveKey(item.key)
    } else {
      setActiveKey(-1)
    }
  }, [location.pathname, roleNavbarItems])


  return (
    <Nav variant='pills' as='ul' activeKey={activeKey}>
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