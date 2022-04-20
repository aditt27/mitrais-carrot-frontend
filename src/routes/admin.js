import React from 'react'
import { Route } from 'react-router-dom'
import Bazaar from '../pages/Bazaar'
import PrivateRoute from './PrivateRoute'
import { Admin } from '../utils/Role'
import Groups from '../pages/Groups'
import Harvest from '../pages/Harvest'
import StaffInGroup from '../pages/StaffInGroup'
import StaffList from '../pages/StaffList'
import Distribution from '../pages/Distribution'
import CarrotHistory from '../pages/CarrotHistory'
import BazaarItemDetail from '../pages/BazaarItemDetail'
import AdminSetting from '../pages/AdminSetting'
import Notification from '../pages/Notification'
import GroupDetails from '../pages/GroupDetails'

const routesAdmin = [
  {
    key: 'bazaar',
    path: '',
    element: <Bazaar roles={[Admin]} />
  },
  {
    key: 'group',
    path: 'group',
    element: <Groups roles={[Admin]} />
  },
  {
    key: 'barn',
    path: 'barn',
    element: <Harvest roles={[Admin]} />
  },
  {
    key: 'staff-in-group',
    path: 'staff-in-group',
    element: <StaffInGroup roles={[Admin]} />
  },
  {
    key: 'staff-list',
    path: 'staff-list',
    element: <StaffList roles={[Admin]} />
  },
  {
    key: 'distribution',
    path: 'distribution',
    element: <Distribution roles={[Admin]} />
  },
  {
    key: 'carrotHistory',
    path: 'carrotHistory',
    element: <CarrotHistory roles={[Admin]} />
  },
  {
    key: 'rewardDetail',
    path: 'rewardDetail',
    element: <BazaarItemDetail roles={[Admin]} />
  },
  {
    key: 'setting',
    path: 'setting',
    element: <AdminSetting roles={[Admin]} />
  },
  {
    key: 'notification',
    path: 'notification',
    element: <Notification roles={[Admin]} />
  },
  {
    key: 'groupDetails',
    path: 'groupDetails',
    element: <GroupDetails roles={[Admin]}/>
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