import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import WithUser from './WithUser'
import WithoutUser from './WithoutUser'

export const Home = () => {
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const userName = user?.result.name
  useEffect(() => {
      const token = user?.token
      setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
      <div className="App">
        {user ? <WithUser/> : <WithoutUser/>}
      </div>
  )
}