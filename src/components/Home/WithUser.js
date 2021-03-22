import React,{useState,useEffect} from 'react'
import DonorList from '../DonorList';
import Form from '../Form';

function WithUser() {
    const fetchURL = 'http://127.0.0.1:8000/api/donor/';
    const getItems = () => fetch(fetchURL).then(res => res.json());
    const [donors, setDonors] = useState([]);
    const [editDonor, setEditDonor] = useState(null);

    useEffect(() => {
        getItems().then(data => setDonors(data));
      }, []);

    const editBtn = (donor) => {
        setEditDonor(donor)
    }

    const updatedInformation = (donor) => {
        const new_donor = donors.map(mydonor => {
          if(mydonor.id === donor.id) {
            return donor;
          }
          else {
            return mydonor;
          }
        })
    
        setDonors(new_donor)
    
      }
    
      const donorForm = () => {
        setEditDonor({
          Title:'',
          Family_Name:'',
          First_Name:'',
          Current_Address:'',
          Email:'',
          Phone:'',
          Birth_Date:'',
          First_Donation_Date:'',
          Recruitment_Source:'',
          Recruitment_Reason:'',
          Number_of_Donations:'',
          Cumulative_Donation_Amount:'',
          Last_Donation_Amount:'',
          Date_of_Last_Donation:'',
          Preferred_Communication:'',
          Date_of_Last_Communication:'',
          Last_communication:'',
          SEF_POC:'',
          Notes:'',
          Email_Communication_Rate:''
        })
    
      }
    
      const insertedInformation = (donor) => {
        const new_donors = [...donors, donor]
        setDonors(new_donors)
    
      }

      const deleteBtn = (donor) => {
        const new_donors = donors.filter(mydonor => {
          if(mydonor.id === donor.id) {
            return false
          }
          return true;
        })
    
        setDonors(new_donors)
    
      }

    return (
        <div className="App">
          <div className = "row">
            <div className = "col">        
              <br/> 
            </div>
            <div className = "col">        
              <br/> 
            </div>
            <div className = "col">
              <button onClick = {donorForm} className = "btn btn-primary">Add Donor</button>
            </div>
          </div>
          <div className = "row">
            <br/>
          </div>


            <DonorList donors = {donors} editBtn = {editBtn} deleteBtn = {deleteBtn}/>

            {editDonor ? <Form donor = {editDonor} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation}/> : null}
        </div>
    )
}

export default WithUser