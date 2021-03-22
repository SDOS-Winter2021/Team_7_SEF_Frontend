import React,{useState,useEffect} from 'react'
import DonorList from '../DonorList';
import Form from '../Form';
import { useHistory } from 'react-router-dom';

function WithUser() {
    const fetchURL = 'http://127.0.0.1:8000/api/donor/';
    const getItems = () => fetch(fetchURL).then(res => res.json());
    const [donors, setDonors] = useState([]);
    const [editDonor, setEditDonor] = useState(null);
    const history = useHistory();

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
        history.push('/donor');
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