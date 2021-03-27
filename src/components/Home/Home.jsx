import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import WithUser from './WithUser'
import WithoutUser from './WithoutUser'
import WithUserTransaction from '../Transaction Home/WithUserTransaction'
import APIService from '../../APIService';

export const Home = () => {
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [email, setEmail] = useState('')
  useEffect(() => {
    const token = user?.token
    setUser(JSON.parse(localStorage.getItem('profile')))
    // setBranch('Finance') //Donor, Finance, CNF
    setEmail(user?.result.email)

  }, [location])

  return (
    <div className="App">
      {user ? <UserCheck email={email} /> : <WithoutUser />}
    </div>
  )
}

const UserCheck = (props) => {
  const [staff, setStaff] = useState([])
  const getItems = () => APIService.GetStaff();

  useEffect(() => {
    getItems().then(data => data.forEach(data_item => {
      if (props.email == data_item.Email) {
        setStaff(data_item)
        localStorage.setItem('Team',JSON.stringify(data_item.Team))
      }
    }))
  }, [props])

  return (
    <div className="App">
      {staff.Team == 'Donor' ? <WithUser /> : <WithUserTransaction />}
    </div>
  )
}



// getItems().then(data => setStaffMembers(data));
// staffMembers.forEach(staffMember => {
//   if (props.user.Email == staffMember.Email) {
//     setStaff(staffMember)
//   }
// })