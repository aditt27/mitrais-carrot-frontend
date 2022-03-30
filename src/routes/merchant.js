import React from 'react'
import { Route } from 'react-router-dom'
import Bazaar from '../pages/Bazaar'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import { Merchant } from '../utils/Role'
import CarrotHistory from '../pages/CarrotHistory'
import BazaarItemDetail from '../pages/BazaarItemDetail'

const routesMerchant = [
  {
    key: 1,
    path: '',
    element: <Dashboard roles={[Merchant]} />
  },
  {
    key: 2,
    path: 'bazaar/',
    element: <Bazaar roles={[Merchant]} />
  },
  {
    key: 3,
    path: 'carrotHistory',
    element: <CarrotHistory roles={[Merchant]} />
  },
  {
    key: 4,
    path: 'bazaar/item',
    element: <BazaarItemDetail roles={[Merchant]} />
  }
]

export default routesMerchant.map(item => {
  return <Route
    exact path={item.path} key={item.key}
    element={<PrivateRoute>
      {item.element}
    </PrivateRoute>}
  />
})