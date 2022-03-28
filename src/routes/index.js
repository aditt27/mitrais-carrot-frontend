import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CarrotLayout from '../components/CarrotLayout'
import Bazaar from '../pages/Bazaar'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import PrivateRoute from './PrivateRoute'

class CarrotRouter extends React.Component {

  routes = [
    {
      key: 1,
      path: '',
      element: <Dashboard />
    },
    {
      key: 2,
      path: 'bazaar',
      element: <Bazaar />
    }
  ]

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/logout' element={<Logout />} />

          <Route path='/' element={<CarrotLayout title='Title Here' />}>
            {
              this.routes.map(item => {
                return <Route
                  exact path={item.path} key={item.key}
                  element={<PrivateRoute>
                    {item.element}
                  </PrivateRoute>}
                />
              })
            }
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default CarrotRouter