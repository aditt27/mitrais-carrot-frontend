import React from 'react'
import { Route } from 'react-router-dom'
import Bazaar from '../pages/Bazaar'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import { Manager } from '../utils/Role'
import ShareCarrot from '../components/ShareCarrot'

const routesManager = [
  {
    key: 1,
    path: '',
    element: <Dashboard roles={[Manager]} />
  },
  {
    key: 2,
    path: 'bazaar',
    element: <Bazaar roles={[Manager]} />
  },
  {
    key: 3,
    path: 'share-carrot',
    element: <ShareCarrot roles={[Manager]} />
  }
]

export default routesManager.map(item => {
  return <Route
    exact path={item.path} key={item.key}
    element={<PrivateRoute>
      {item.element}
    </PrivateRoute>}
  />
})