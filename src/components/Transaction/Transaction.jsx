import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AddTransaction from './AddTransaction'
import EditTransaction from './EditTransaction'
import WithoutUser from '../WithoutUser'

export const Transaction = () => {
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [transaction, setTransaction] = useState(JSON.parse(localStorage.getItem('curr_transaction')))
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
        setTransaction(JSON.parse(localStorage.getItem('curr_transaction')))
    }, [location])

    if (user === null) {
      return (
        <div className="App">
          <WithoutUser/>
        </div>
      )
    }

    else {
      return (
        <div className="App">
          <TeamCheck transaction = {transaction} />
        </div>
      )
    }
  }


const TeamCheck = (props) => {
  const [transaction, setTransaction] = useState([])
  const [team, setTeam] = useState(JSON.parse(localStorage.getItem('Team')))
  useEffect(() => {
    setTransaction(props.transaction)
    setTeam(JSON.parse(localStorage.getItem('Team')))
  }, [props])

  if (team !== 'Donor') {
    if (transaction === null) {
      return (
        <div className="App">
          <AddTransaction/>
        </div>
    )
    }
    else{
      return (
        <div className="App">
          <EditTransaction transaction={transaction}/>
        </div>
    )
    }
  }

  else{
    return (
      <div className="App">
        <WithoutUser/>
      </div>
    )
  }
}
