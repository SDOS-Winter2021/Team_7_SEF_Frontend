import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import WithUser from './WithUser'
import WithoutUser from './WithoutUser'
import WithUserTransaction from '../Transaction Home/WithUserTransaction'

export const Home = () => {
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [branch, setBranch] = useState('')
  useEffect(() => {
      const token = user?.token
      setUser(JSON.parse(localStorage.getItem('profile')))
      setBranch('Finance') //Donor, Finance, CNF
  }, [location])

  return (
      <div className="App">
        {user ? <UserCheck branch={branch}/> : <WithoutUser/>}
      </div>
  )
}

const UserCheck = (props) => {
  const [branch, setBranch] = useState('')
  useEffect(() => {
    setBranch(props.branch)
  }, [])
  return (
      <div className="App">
      {branch=='Donor' ? <WithUser/> : <WithUserTransaction/> }
      {/* {branch=='Donor' ? <WithUserTransaction/> :<WithUser/> } */}
      </div>
  )
}