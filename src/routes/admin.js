import React from 'react'
import { Route } from 'react-router-dom'
import Bazaar from '../pages/Bazaar'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import { Admin } from '../utils/Role'
import ManageBazaar from '../pages/ManageBazaar'
import Groups from '../pages/Groups'
import Harvest from '../pages/Harvest'
import StaffInGroup from '../components/StaffInGroup'
import StaffList from '../components/StaffList'
import CarrotHistory from '../pages/CarrotHistory'
import BazaarItemDetail from '../pages/BazaarItemDetail'

const routesAdmin = [
  {
    key: 1,
    path: '',
    element: <Dashboard roles={[Admin]} />
  },
  {
    key: 2,
    path: 'bazaar',
    element: <Bazaar roles={[Admin]} />
  },
  {
    key: 3,
    path: 'bazaar/manage',
    element: <ManageBazaar roles={[Admin]} />
  },
  {
    key: 4,
    path: 'group',
    element: <Groups roles={[Admin]} />
  },
  {
    key: 5,
    path: 'barn',
    element: <Harvest roles={[Admin]} />
  },
  {
    key: 6,
    path: 'staff-in-group',
    element: <StaffInGroup roles={[Admin]} />
  },
  {
    key: 7,
    path: 'staff-list',
    element: <StaffList roles={[Admin]} />
  },
  {
    key: 3,
    path: 'carrotHistory',
    element: <CarrotHistory roles={[Admin]} />
  },
  {
    key: 4,
    path: 'bazaar/item',
    element: <BazaarItemDetail roles={[Admin]} />
  }
]

export default routesAdmin.map(item => {
  return <Route
    exact path={item.path} key={item.key}
    element={<PrivateRoute>
      {item.element}
    </PrivateRoute>}
  />
})