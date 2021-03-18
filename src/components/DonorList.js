import React from 'react'

function DonorList(props) {

    const editBtn = (donor) => {
        props.editBtn(donor)
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
                    <button className = 'btn btn-primary' onClick = {() => editBtn(donor)}>Edit</button>
                    <hr/>
                    </div>
                )
            })}
        </div>
    )
}

export default DonorList
