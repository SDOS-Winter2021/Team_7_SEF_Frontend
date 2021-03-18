import React from 'react';
import APIService from '../APIService';


function DonorList(props) {

    let headers = ["Title","Family_Name","First_Name","Current_Address","Email","Phone","First_Donation_Date","Recruitment_Source","Number_of_Donations","Last_Donation_Amount","SEF_POC"]
    // let headers = ["Title","Family_Name","First_Name","Current_Address","Email","Phone","Birth_Date","First_Donation_Date","Recruitment_Source","Recruitment_Reason","Number_of_Donations","Cumulative_Donation_Amount","Last_Donation_Amount","Date_of_Last_Donation","Preferred_Communication","Date_of_Last_Communication","Last_communication","SEF_POC","Notes","Email_Communication_Rate"]

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
            <table id='donors'> 
               <tbody>
                   <tr>{headers.map((key, index) => {
                        return <th key={index}>{key.toUpperCase()}</th>
                    })}</tr>
                  {props.donors && props.donors.map((donor, index) => {
                    const { id, Title, Family_Name,
                        First_Name,
                        Current_Address,
                        Email,
                        Phone,
                        Birth_Date,
                        First_Donation_Date,
                        Recruitment_Source,
                        Recruitment_Reason,
                        Number_of_Donations,
                        Cumulative_Donation_Amount,
                        Last_Donation_Amount,
                        Date_of_Last_Donation,
                        Preferred_Communication,
                        Date_of_Last_Communication,
                        Last_communication,
                        SEF_POC,
                        Notes,
                        Email_Communication_Rate } = donor //destructuring
                    return (
                        <tr key={id}>
                            <td>{Title}</td>
                            <td>{Family_Name}</td>
                            <td>{First_Name}</td>
                            <td>{Current_Address}</td>
                            <td>{Email}</td>
                            <td>{Phone}</td>
                            {/* <td>{Birth_Date}</td> */}
                            <td>{First_Donation_Date}</td>
                            <td>{Recruitment_Source}</td>
                            {/* <td>{Recruitment_Reason}</td> */}
                            <td>{Number_of_Donations}</td>
                            {/* <td>{Cumulative_Donation_Amount}</td> */}
                            <td>{Last_Donation_Amount}</td>
                            {/* <td>{Date_of_Last_Donation}</td> */}
                            {/* <td>{Preferred_Communication}</td> */}
                            {/* <td>{Date_of_Last_Communication}</td> */}
                            {/* <td>{Last_communication}</td> */}
                            <td>{SEF_POC}</td>
                            {/* <td>{Notes}</td> */}
                            {/* <td>{Email_Communication_Rate}</td> */}
                            <td><button className = "btn btn-primary" onClick  = {() => editBtn(donor)}>Update</button></td>
                            <td><button onClick = {() => deleteBtn(donor)} className = "btn btn-danger">Delete</button></td>
                        </tr>
                    )
                    })}
               </tbody>
            </table>

            {/* {props.donors && props.donors.map(donor => {
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
            })} */}
        </div>
    )
}

export default DonorList
