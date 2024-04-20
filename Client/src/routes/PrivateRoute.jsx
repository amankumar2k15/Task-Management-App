import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import Home from '../pages/Dashboard/Home'
import ErrorPage from './ErrorPage'
import { getToken } from '../helper/tokenHelper'

const PrivateRoute = () => {
  const navigate = useNavigate()

  //if not token it will redirect to login page
  useEffect(() => {
    if (!getToken()) navigate("/login")
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default PrivateRoute