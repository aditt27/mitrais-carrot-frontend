import React from 'react'
import { Route } from 'react-router-dom'
import Bazaar from '../pages/Bazaar'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import { Staff } from '../utils/Role'

const routesStaff = [
  {
    key: 1,
    path: '',
    element: <Dashboard roles={[Staff]} />
  },
  {
    key: 2,
    path: 'bazaar',
    element: <Bazaar roles={[Staff]} />
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