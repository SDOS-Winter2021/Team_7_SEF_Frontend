import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import WithUser from './WithUser'
import WithoutUser from './WithoutUser'
import WithUserTransaction from '../Transaction Home/WithUserTransaction'
import APIService from '../../APIService';

export const Home = () => {
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('profile')).result
  const [email, setEmail] = useState('')
  useEffect(() => {
    // const token = user?.token
    // setUser(JSON.parse(localStorage.getItem('profile')))
    // setBranch('Finance') //Donor, Finance, CNF
    setEmail(user?.email)

  }, [location,user])

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
  const [staff, setStaff] = useState([])
  const getItems = () => APIService.GetStaff();

  useEffect(() => {
    getItems().then(data => data.forEach(data_item => {
      if (props.email === data_item.Email) {
        setStaff(data_item)
        localStorage.setItem('Team',JSON.stringify(data_item.Team))
      }
    }))
  }, [props])

  if (staff.Team === 'Donor') {
    return (
      <div className="App">
        <WithUser />
      </div>
    )
  }

  else if (staff.Team === 'Finance') {
    return (
      <div className="App">
        <WithUserTransaction />
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

