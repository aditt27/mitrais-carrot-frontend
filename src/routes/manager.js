import React from 'react'
import { Route } from 'react-router-dom'
import Bazaar from '../pages/Bazaar'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import { Manager } from '../utils/Role'
import ShareCarrot from '../components/ShareCarrot'
import CarrotHistory from '../pages/CarrotHistory'
import BazaarItemDetail from '../pages/BazaarItemDetail'

const routesManager = [
  {
    key: 1,
    path: '',
    element: <Bazaar roles={[Manager]} />
  },
  {
    key: 2,
    path: 'share-carrot',
    element: <ShareCarrot roles={[Manager]} />
  },
  {
    key: 3,
    path: 'carrotHistory',
    element: <CarrotHistory roles={[Manager]} />
  },
  {
    key: 4,
    path: 'rewardDetail',
    element: <BazaarItemDetail roles={[Manager]} />
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