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
import EarnHistoryStaff from '../components/EarnHistoryStaff'

class CarrotRouter extends React.Component {

  routesAdmin = [
    {
      key: 1,
      path: '',
      element: <Dashboard roles={[Admin]} />
    },
    {
      key: 2,
      path: 'bazaar',
      element: <Bazaar roles={[Admin]} />
    },
    {
      key: 3,
      path: 'bazaar/manage',
      element: <ManageBazaar roles={[Admin]} />
    },
    {
      key: 4,
      path: 'group',
      element: <Groups roles={[Admin]} />
    },
    {
        key: 5,
        path: 'barn',
        element: <Harvest roles={[Admin]} />
    },
    {
        key: 6,
        path: 'staff-in-group',
        element: <StaffInGroup roles={[Admin]} />
    },
    {
        key: 7,
        path: 'staff-list',
        element: <StaffList roles={[Admin]} />
    }
  ]

  routesMerchant = [
    {
      key: 1,
      path: '',
      element: <Dashboard roles={[Merchant]} />
    },
    {
      key: 2,
      path: 'bazaar/',
      element: <Bazaar roles={[Merchant]} />
    }
  ]

  routesManager = [
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

  routesStaff = [
    {
      key: 1,
      path: '',
      element: <Dashboard roles={[Staff]} />
    },
    {
      key: 2,
      path: 'bazaar',
      element: <Bazaar roles={[Staff]} />
    },
    {
      key: 3,
      path: 'earn-history',
      element: <EarnHistoryStaff roles={[Staff]} />
    }
  ]

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/logout' element={<Logout />} />
          <Route exact path='/forbidden' element={<Forbidden />} />
          <Route exact path='/change-password' element={<ChangePassword />} />
          <Route exact path='' element={<RedirectRoute />} />

          <Route path='/admin' element={<CarrotLayout role={Admin} title='Title Here' />}>
            {
              this.routesAdmin.map(item => {
                return <Route
                  exact path={item.path} key={item.key}
                  element={<PrivateRoute>
                    {item.element}
                  </PrivateRoute>}
                />
              })
            }
          </Route>

          <Route path='/merchant' element={<CarrotLayout role={Merchant} title='Title Here' />}>
            {
              this.routesMerchant.map(item => {
                return <Route
                  exact path={item.path} key={item.key}
                  element={<PrivateRoute>
                    {item.element}
                  </PrivateRoute>}
                />
              })
            }
          </Route>

          <Route path='/manager' element={<CarrotLayout role={Manager} title='Title Here' />}>
            {
              this.routesManager.map(item => {
                return <Route
                  exact path={item.path} key={item.key}
                  element={<PrivateRoute>
                    {item.element}
                  </PrivateRoute>}
                />
              })
            }
          </Route>

          <Route path='/staff' element={<CarrotLayout role={Staff} title='Title Here' />}>
            {
              this.routesStaff.map(item => {
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