import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AddEPTaskForm from './AddEPTaskForm'
import WithoutUser from '../WithoutUser'
// import APIService from '../../APIService';

export const AddEPTask = () => {
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
    const [donor, setDonor] = useState(JSON.parse(localStorage.getItem('curr_donor')))
    // const [receipts, setReceipts] = useState([])

    useEffect(() => {
        setTeam(JSON.parse(localStorage.getItem('Team')))
        setDonor(JSON.parse(localStorage.getItem('curr_donor')))
    }, [props])

    // useEffect(() => {
    //     const getItems = () => APIService.GetReceipts(props.donor.PAN);
    //     getItems().then(data => setReceipts(data));
    // }, [props])

    if (team === 'Donor' || team === 'CnF') {
        return (
            <div className="App">
                <AddEPTaskForm donor={donor}/>
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