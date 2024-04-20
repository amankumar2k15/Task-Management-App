import React, { useEffect } from 'react'
import PublicRoutes from './routes/PublicRoutes'
import PrivateRoute from './routes/PrivateRoute'
import { Route, Routes, useLocation } from 'react-router-dom'
import { clearStorage } from './helper/tokenHelper'

const App = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") {
      clearStorage()
    }
  }, [pathname])


  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/dashboard/*" element={<PrivateRoute />} />
    </Routes>
  )
}

export default App