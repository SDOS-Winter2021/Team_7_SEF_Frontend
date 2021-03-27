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
        const token = user?.token
        const token2 = donor?.token
        setUser(JSON.parse(localStorage.getItem('profile')))
        setDonor(JSON.parse(localStorage.getItem('curr_donor')))
    }, [location])
  
    return (
        <div className="App">
          {user ? <TeamCheck donor = {donor} /> : <WithoutUser/>}
        </div>
    )
  }

const TeamCheck = (props) => {
  const [donor, setDonor] = useState(props.donor)
    const [team, setTeam] = useState(JSON.parse(localStorage.getItem('Team')))
    useEffect(() => {
        setDonor(props.donor)
        setTeam(JSON.parse(localStorage.getItem('Team')))
    }, [])
    return (
        <div className="App">
          {team != 'Finance' ? <DonorCheck donor = {donor} /> : <WithoutUser/> }
        </div>
    )
}


const DonorCheck = (props) => {
    const [donor, setDonor] = useState([])
    // const [team, setTeam] = useState(JSON.parse(localStorage.getItem('Team')))
    useEffect(() => {
        setDonor(props.donor)
    }, [])
    return (
        <div className="App">
          {donor ? <EditDonor donor={donor}/> : <AddDonor/> }
        </div>
    )
}