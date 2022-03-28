import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CarrotLayout from '../components/CarrotLayout'
import Bazaar from '../pages/Bazaar'
import Dashboard from '../pages/Dashboard'
import StaffInGroup from '../components/StaffInGroup'

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
        },
        {
            key: 3,
            path: 'staff-in-group',
            element: <StaffInGroup />
        }
    ]

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<CarrotLayout title='Title Here'/>}>
                    {
                        this.routes.map(item=> {
                            return <Route path={item.path} element={item.element} key={item.key}/>
                        })
                    }
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default CarrotRouter