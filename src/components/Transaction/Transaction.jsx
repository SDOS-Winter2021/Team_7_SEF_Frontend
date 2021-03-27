import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AddTransaction from './AddTransaction'
import EditTransaction from './EditTransaction'
import WithoutUser from '../Home/WithoutUser'

export const Transaction = () => {
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [transaction, setTransaction] = useState(JSON.parse(localStorage.getItem('curr_transaction')))
    useEffect(() => {
        const token = user?.token
        const token2 = transaction?.token
        setUser(JSON.parse(localStorage.getItem('profile')))
        setTransaction(JSON.parse(localStorage.getItem('curr_transaction')))
    }, [location])
  
    return (
        <div className="App">
          {user ? <TeamCheck transaction = {transaction} /> : <WithoutUser/>}
        </div>
    )
  }


const TeamCheck = (props) => {
  const [transaction, setTransaction] = useState([])
  const [team, setTeam] = useState(JSON.parse(localStorage.getItem('Team')))
  useEffect(() => {
    setTransaction(props.transaction)
    setTeam(JSON.parse(localStorage.getItem('Team')))
  }, [])
  return (
      <div className="App">
        {team != 'Donor' ? <TransactionCheck transaction = {transaction} /> : <WithoutUser/> }
      </div>
  )
}

const TransactionCheck = (props) => {
    const [transaction, setTransaction] = useState(JSON.parse(localStorage.getItem('curr_transaction')))
    useEffect(() => {
        setTransaction(props.transaction)
    }, [])
    return (
        <div className="App">
          {transaction ? <EditTransaction transaction={transaction}/> : <AddTransaction/> }
        </div>
    )
}