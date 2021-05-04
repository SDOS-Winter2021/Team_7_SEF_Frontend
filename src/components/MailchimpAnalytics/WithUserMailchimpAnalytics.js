import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

function WithUserMailchimpAnalytics() {

  const getItems = () => APIService.GetDonor();
  const [donors, setDonors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getItems().then(data => setDonors(data));
  }, []);

//   const editBtn = (donor) => {
//     localStorage.setItem('curr_donor', JSON.stringify(donor))
//     history.push('/donor/donorEP');
//     // history.push('/donor/donorEP/editDonor');
//   }

//   const noteBtn = (donor) => {
//     localStorage.setItem('curr_donor', JSON.stringify(donor))
//     history.push('/donor/notes');
//   }

//   const donorForm = () => {
//     localStorage.setItem('curr_donor', null)
//     history.push('/donor/addDonor');
//   }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>MailChimp Analytics</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="col">
        </div>
        <div className="col">
        </div>
        <div className="col">
        </div>
        <div className="col">
          {/* <button onClick={donorForm} className="btn btn-primary">Add Donor</button> */}
        </div>
      </div>
      <div className="row">
        <br />
      </div>
      
      <div>
        <ScrollUpButton />
      </div>
    </div>
  )
}

export default WithUserMailchimpAnalytics
