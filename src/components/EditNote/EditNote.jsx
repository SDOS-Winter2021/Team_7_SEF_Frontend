import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import EditNoteForm from './EditNoteForm'
import WithoutUser from '../WithoutUser'

export const EditNote = () => {
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
    const [note, setNote] = useState(JSON.parse(localStorage.getItem('curr_note')))
    useEffect(() => {
        setTeam(JSON.parse(localStorage.getItem('Team')))
        setDonor(JSON.parse(localStorage.getItem('curr_donor')))
        setNote(JSON.parse(localStorage.getItem('curr_note')))
    }, [props])

    if (team === 'Donor' || team === 'CnF') {
        return (
            <div className="App">
                <EditNoteForm donor={donor} note={note} />
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