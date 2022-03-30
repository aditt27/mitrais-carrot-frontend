import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CarrotLayout from '../components/CarrotLayout'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import PrivateRoute from './PrivateRoute'
import RedirectRoute from './RedirectRoute'
import Forbidden from '../pages/Forbidden';
import { Admin, Merchant, Manager, Staff } from '../utils/Role'
import ChangePassword from '../pages/ChangePassword'
import AdminRoute from './admin'
import MerchantRoute from './merchant'
import ManagerRoute from './manager'
import StaffRoute from './staff'

class CarrotRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/logout' element={<Logout />} />
          <Route exact path='/forbidden' element={<Forbidden />} />
          <Route exact path='/change-password' element={<PrivateRoute>
            <ChangePassword routes={[Admin, Merchant, Manager, Staff]} />
          </PrivateRoute>} />
          
          <Route exact path='' element={<RedirectRoute />} />

          <Route path='/admin' element={<CarrotLayout role={Admin} title='Barn Management' />}>
            {AdminRoute}
          </Route>

          <Route path='/merchant' element={<CarrotLayout role={Merchant} />}>
            {MerchantRoute}
          </Route>

          <Route path='/manager' element={<CarrotLayout role={Manager} />}>
            {ManagerRoute}
          </Route>

          <Route path='/staff' element={<CarrotLayout role={Staff} />}>
            {StaffRoute}
          </Route>
        </Routes>

      </BrowserRouter>
    )
  }
}

export default CarrotRouter