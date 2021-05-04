import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import WithoutUser from '../WithoutUser'
import WithUserMailchimpAnalytics from './WithUserMailchimpAnalytics'

export const MailchimpAnalytics = () => {
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
  
    if (team === 'Donor' || team === 'CnF') {
      return (
        <div className="App">
          <WithUserMailchimpAnalytics />
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