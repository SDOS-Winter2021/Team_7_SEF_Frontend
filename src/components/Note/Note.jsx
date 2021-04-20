import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import NoteUser from './NoteUser'
import WithoutUser from '../WithoutUser'

export const Note = () => {
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

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
        <TeamCheck />
      </div>
    )
  }


}

const TeamCheck = () => {
    const [donor, setDonor] = useState(JSON.parse(localStorage.getItem('curr_donor')))
  const [team, setTeam] = useState(JSON.parse(localStorage.getItem('Team')))
  useEffect(() => {
    setDonor(JSON.parse(localStorage.getItem('curr_donor')))
    setTeam(JSON.parse(localStorage.getItem('Team')))
  }, [])

  if (team === 'Donor' || team === 'CnF') {
      return (
        <div className="App">
          <NoteUser donor={donor} />
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