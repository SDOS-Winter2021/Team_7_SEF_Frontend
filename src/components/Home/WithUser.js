import React,{useState,useEffect} from 'react'
import DonorList from '../DonorList';
import { useHistory } from 'react-router-dom';

function WithUser() {
    const fetchURL = 'http://127.0.0.1:8000/api/donor/';
    const getItems = () => fetch(fetchURL).then(res => res.json());
    const [donors, setDonors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getItems().then(data => setDonors(data));
      }, []);

    const editBtn = (donor) => {
      localStorage.setItem('curr_donor',JSON.stringify(donor))
      history.push('/donor');
    }
    
      const donorForm = () => {
        localStorage.setItem('curr_donor',null)
        history.push('/donor');
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
            <DonorList donors = {donors} editBtn = {editBtn}/>
        </div>
    )
}

export default WithUser