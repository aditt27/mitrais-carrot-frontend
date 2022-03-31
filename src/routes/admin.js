import React from 'react'
import { Route } from 'react-router-dom'
import Bazaar from '../pages/Bazaar'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import { Admin } from '../utils/Role'
import Groups from '../pages/Groups'
import Harvest from '../pages/Harvest'
import StaffInGroup from '../components/StaffInGroup'
import StaffList from '../components/StaffList'
import Distribution from '../components/Distribution'
import CarrotHistory from '../pages/CarrotHistory'
import BazaarItemDetail from '../pages/BazaarItemDetail'
import AdminSetting from '../pages/AdminSetting'

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
    key: 8,
    path: 'distribution',
    element: <Distribution roles={[Admin]} />
  },
  {
    key: 9,
    path: 'carrotHistory',
    element: <CarrotHistory roles={[Admin]} />
  },
  {
    key: 10,
    path: 'bazaar/rewardDetail',
    element: <BazaarItemDetail roles={[Admin]} />
  },
  {
    key: 11,
    path: 'setting',
    element: <AdminSetting roles={[Admin]} />
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