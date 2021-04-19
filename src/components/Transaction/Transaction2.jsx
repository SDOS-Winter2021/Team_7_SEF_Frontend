import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import WithUserTransaction from './WithUserTransaction'
import WithoutUser from '../WithoutUser'

export const Transaction = () => {
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [email, setEmail] = useState('')
  useEffect(() => {
    setEmail(user?.result.email)
  }, [location, user])

  if (user === null) {
    return (
      <div className="App">
        <WithoutUser />
      </div>
    )
  }

  else {
    return (
      <div className="App">
        <UserCheck email={email} />
      </div>
    )
  }
}

const UserCheck = (props) => {
  const [team, setTeam] = useState(JSON.parse(localStorage.getItem('Team')))
  useEffect(() => {
    setTeam(JSON.parse(localStorage.getItem('Team')))
  }, [props])

  if (team === 'Finance' || team === 'CnF') {
    return (
      <div className="App">
        <WithUserTransaction />
      </div>
    )
  }

  else {
    return (
      <div className="App">
        <WithoutUser />
      </div>
    )
  }

}