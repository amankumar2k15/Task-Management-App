import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'

const PublicRoutes = () => {

    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Navigate to="/register" />} />
        </Routes>
    )
}

export default PublicRoutes