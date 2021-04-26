import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import EditTransactionForm from './EditTransactionForm'
import WithoutUser from '../WithoutUser'

export const EditTransaction = () => {
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
  const [transaction, setTransaction] = useState(JSON.parse(localStorage.getItem('curr_transaction')))
  const [team, setTeam] = useState(JSON.parse(localStorage.getItem('Team')))
  useEffect(() => {
    setTransaction(JSON.parse(localStorage.getItem('curr_transaction')))
    setTeam(JSON.parse(localStorage.getItem('Team')))
  }, [])

  if (team === 'Finance' || team === 'CnF') {
      return (
        <div className="App">
          <EditTransactionForm transaction={transaction} />
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