import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { Merchant } from '../utils/Role'
import ManageBazaar from '../pages/ManageBazaar'
import PendingExchange from '../pages/PendingExchange'
import BazaarClaimed from '../pages/BazaarClaimed'
import Notification from '../pages/Notification'

const routesMerchant = [
  {
    key: 1,
    path: '',
    element: <ManageBazaar roles={[Merchant]} />
  },
  {
    key: 2,
    path: 'bazaar/pending',
    element: <PendingExchange roles={[Merchant]} />
  },
  {
    key: 3,
    path: 'bazaar/claimed',
    element: <BazaarClaimed roles={[Merchant]} />
  },
  {
    key: 4,
    path: 'notification',
    element: <Notification roles={[Merchant]} />
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