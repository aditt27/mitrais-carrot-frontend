import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CarrotLayout from '../components/CarrotLayout'
import Bazaar from '../pages/Bazaar'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import PrivateRoute from './PrivateRoute'
import RedirectRoute from './RedirectRoute'
import Forbidden from '../pages/Forbidden';
import { Admin, Merchant, Manager, Staff } from '../utils/Role'
import ManageBazaar from '../pages/ManageBazaar'
import Groups from '../pages/Groups'
import Harvest from '../pages/Harvest'
import StaffInGroup from '../components/StaffInGroup'
import StaffList from '../components/StaffList'
import ShareCarrot from '../components/ShareCarrot'
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

          <Route path='/merchant' element={<CarrotLayout role={Merchant} title='Title Here' />}>
            {MerchantRoute}
          </Route>

          <Route path='/manager' element={<CarrotLayout role={Manager} title='Title Here' />}>
            {ManagerRoute}
          </Route>

          <Route path='/staff' element={<CarrotLayout role={Staff} title='Title Here' />}>
            {StaffRoute}
          </Route>
        </Routes>

      </BrowserRouter>
    )
  }
}

export default CarrotRouter