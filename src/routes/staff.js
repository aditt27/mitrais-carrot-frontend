import React from 'react'
import { Route } from 'react-router-dom'
import Bazaar from '../pages/Bazaar'
import PrivateRoute from './PrivateRoute'
import { Staff } from '../utils/Role'
import CarrotHistory from '../pages/CarrotHistory'
import BazaarItemDetail from '../pages/BazaarItemDetail'
import Notification from '../pages/Notification'

const routesStaff = [
  {
    key: 'bazaar',
    path: '',
    element: <Bazaar roles={[Staff]} />
  },
  {
    key: 'carrotHistory',
    path: 'carrotHistory',
    element: <CarrotHistory roles={[Staff]} />
  },
  {
    key: 'rewardDetail',
    path: 'rewardDetail',
    element: <BazaarItemDetail roles={[Staff]} />
  },
  {
    key: 'notification',
    path: 'notification',
    element: <Notification roles={[Staff]} />
  }
]

export default routesStaff.map(item => {
  return <Route
    exact path={item.path} key={item.key}
    element={<PrivateRoute>
      {item.element}
    </PrivateRoute>}
  />
})