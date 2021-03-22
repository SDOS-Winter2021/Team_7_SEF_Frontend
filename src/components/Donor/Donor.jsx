import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AddDonor from './AddDonor'
import WithoutUser from '../Home/WithoutUser'

export const Donor = () => {
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  useEffect(() => {
      const token = user?.token
      setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
      <div className="App">
        {user ? <AddDonor/> : <WithoutUser/>}
      </div>
  )
}