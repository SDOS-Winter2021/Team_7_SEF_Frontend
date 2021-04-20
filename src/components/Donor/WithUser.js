import React, { useState, useEffect } from 'react'
import DonorList from './DonorList';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

function WithUser() {

  const getItems = () => APIService.GetDonor();
  const [donors, setDonors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getItems().then(data => setDonors(data));
  }, []);

  const editBtn = (donor) => {
    localStorage.setItem('curr_donor', JSON.stringify(donor))
    history.push('/donor/donorEP');
    // history.push('/donor/donorEP/editDonor');
  }

  const noteBtn = (donor) => {
    localStorage.setItem('curr_donor', JSON.stringify(donor))
    history.push('/donor/notes');
  }

  const donorForm = () => {
    localStorage.setItem('curr_donor', null)
    history.push('/donor/addDonor');
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <button onClick={donorForm} className="btn btn-primary">Add Donor</button>
        </div>
        <div className="col">
          <br />
        </div>
        <div className="col">
          <br />
        </div>
        <div className="col">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Donor</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="row">
        <br />
      </div>
      <DonorList donors={donors} editBtn={editBtn} noteBtn={noteBtn} />
      <div>
        <ScrollUpButton />
      </div>
    </div>
  )
}

export default WithUser