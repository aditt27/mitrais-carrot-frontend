import React from 'react'
import { Route } from 'react-router-dom'
import Bazaar from '../pages/Bazaar'
import PrivateRoute from './PrivateRoute'
import { Manager } from '../utils/Role'
import ShareCarrot from '../pages/ShareCarrot'
import CarrotHistory from '../pages/CarrotHistory'
import BazaarItemDetail from '../pages/BazaarItemDetail'
import Notification from '../pages/Notification'

const routesManager = [
  {
    key: 'bazaar',
    path: '',
    element: <Bazaar roles={[Manager]} />
  },
  {
    key: 'share-carrot',
    path: 'share-carrot',
    element: <ShareCarrot roles={[Manager]} />
  },
  {
    key: 'carrotHistory',
    path: 'carrotHistory',
    element: <CarrotHistory roles={[Manager]} />
  },
  {
    key: 'rewardDetail',
    path: 'rewardDetail',
    element: <BazaarItemDetail roles={[Manager]} />
  },
  {
    key: 'notification',
    path: 'notification',
    element: <Notification roles={[Manager]} />
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