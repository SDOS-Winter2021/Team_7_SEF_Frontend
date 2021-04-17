import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AddDonor from './AddDonor'
import EditDonor from './EditDonor'
import WithoutUser from '../Home/WithoutUser'

export const Donor = () => {
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [donor, setDonor] = useState(JSON.parse(localStorage.getItem('curr_donor')))
  useEffect(() => {
    // const token = user?.token
    // const token2 = donor?.token
    setUser(JSON.parse(localStorage.getItem('profile')))
    setDonor(JSON.parse(localStorage.getItem('curr_donor')))
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
        <TeamCheck donor={donor} />
      </div>
    )
  }


}

const TeamCheck = (props) => {
  const [donor, setDonor] = useState(props.donor)
  const [team, setTeam] = useState(JSON.parse(localStorage.getItem('Team')))
  useEffect(() => {
    setDonor(props.donor)
    setTeam(JSON.parse(localStorage.getItem('Team')))
  }, [props])

  if (team !== 'Finance') {
    if (donor === null) {
      return (
        <div className="App">
          <AddDonor />
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <EditDonor donor={donor} />
        </div>
      )
    }
  }

  else {
    return (
      <div className="App">
        <WithoutUser />
      </div>
    )    
  }
}