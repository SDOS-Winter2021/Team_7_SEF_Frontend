import React from 'react';
import APIService from '../APIService';

function DonorList(props) {

    const editBtn = (donor) => {
        props.editBtn(donor)
    }

   const deleteBtn = (donor) => {
    APIService.DeleteDonor(donor.id)
    .then(() => props.deleteBtn(donor))
    .catch(error => console.log(error))
   
}

    return (
        <div>
            {props.donors && props.donors.map(donor => {
                return (
                    <div key={donor.id}>
                    <h2>{donor.First_Name}</h2>
                    <p>First Donation Date: {donor.First_Donation_Date}</p>
                    <p>Number of Donations: {donor.Number_of_Donations}</p>
                    <p>Cumulative Donation Amount: {donor.Cumulative_Donation_Amount}</p>
                    <p>Date of Last Donation: {donor.Date_of_Last_Donation}</p>
                    <p>SEF POC: {donor.SEF_POC}</p>
                    <div className = "row">
                        <div className = "col-md-1">
                            <button className = "btn btn-primary" onClick  = {() => editBtn(donor)}>Update</button>
                        </div>
                        <div className = "col">
                            <button onClick = {() => deleteBtn(donor)} className = "btn btn-danger">Delete</button>
                        </div>
                    </div>
                    <hr className="hrclass"/>
                    </div>
                )
            })}
        </div>
    )
}

export default DonorList
