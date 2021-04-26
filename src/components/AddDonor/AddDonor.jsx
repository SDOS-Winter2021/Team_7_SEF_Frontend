import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AddDonorForm from './AddDonorForm'
import WithoutUser from '../WithoutUser'

export const AddDonor = () => {
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

const TeamCheck = (props) => {
    const [team, setTeam] = useState(JSON.parse(localStorage.getItem('Team')))
    useEffect(() => {
        setTeam(JSON.parse(localStorage.getItem('Team')))
    }, [props])

    if (team === 'Donor' || team === 'CnF') {
        return (
            <div className="App">
                <AddDonorForm />
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