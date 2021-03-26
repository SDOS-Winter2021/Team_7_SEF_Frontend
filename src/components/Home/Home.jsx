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
  // const [email, setEmail] = useState(props.email);
  const [staff, setStaff] = useState([])
  const getItems = () => APIService.GetStaff();
  // console.log(props.email);
  // useEffect(() => {  },[props])

  useEffect(() => {
    getItems().then(data => data.forEach(data_item => {
      // console.log(data_item.Email)
      console.log(props.email)
      if (props.email == data_item.Email) {
        setStaff(data_item)
      }
    }))
    // console.log(props.email)
  }, [props])

  return (
    <div className="App">
      {staff.Team == 'Donor' ? <WithUser /> : <WithUserTransaction />}
      {/* {branch=='Donor' ? <WithUserTransaction/> :<WithUser/> } */}
    </div>
  )
}



// getItems().then(data => setStaffMembers(data));
// staffMembers.forEach(staffMember => {
//   if (props.user.Email == staffMember.Email) {
//     setStaff(staffMember)
//   }
// })